const fln = "server.js";
///////////////////////////////////

const express = require("express");
const app = express();

const cookieSession = require("cookie-session");

const db = require("./db");
const { compare, hash } = require("./bc");

// -- the ones that were already here
const compression = require("compression");
const path = require("path");

const mw = require("../route_middleware");
// ============ s3 and Multer and All ======== //

const s3 = require("./s3");
const multer = require("multer");
const uidSafe = require("uid-safe");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

// ============= Middleware ================= //

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(express.json());

app.use(
    cookieSession({
        secret: "i'm gay",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: true,
        // secure: true, // --- *** was the cause of the cookie problem
    })
);

app.use(mw.logRouteInfo);

//////////////////////////////// ROUTES ////////////////////////////////
//============================    START    ====================================//
// --- Start
app.get("/user/id.json", (req, res) => {
    res.json({ userCookie: req.session }); // --- ??? can i access session (cookie) from client side??
});

//============================== Register, Login, Logout ===================================//

// --- Register
app.post("/user/register.json", (req, res) => {
    const { first, last, email, password } = req.body;
    hash(password)
        .then((hashedPass) => {
            return db.registerUser(first, last, email, hashedPass);
        })
        .then(({ rows }) => {
            req.session = rows[0];
            // console.log(`>>> ${fln} >> register > req.session AFTER:`, req.session);
            return res.json({
                serverSuccess: true,
                user_id: req.session.user_id,
            });
        })
        .catch((err) => {
            console.log("error in server.js -- POST/register", err);
            res.json({ serverSuccess: false });
        });
});

// --- Login
app.post("/user/login.json", (req, res) => {
    const { email, password } = req.body;
    let cookie;
    return Promise.all([db.getUserPass(email), db.getUserId(email)])
        .then(([{ rows: rowsUserPass }, { rows: rowsUserId }]) => {
            const storedPass = rowsUserPass[0].stored_pass;
            cookie = rowsUserId[0];
            return compare(password, storedPass);
        })
        .then((isMatch) => {
            if (isMatch) {
                req.session = cookie;
                res.json({ serverSuccess: true, user_id: req.session.user_id });
            } else {
                res.json({ serverSuccess: false });
            }
        })
        .catch((err) => {
            console.log("error in /login.json", err);
            return res.json({ serverSuccess: false });
        });
});

// --- Logout
app.get("/logout", (req, res) => {
    req.session = null;
    res.json({ userCookie: req.session });
});

//================================ Edit User Info =========================================//

// --- Store Profile Pic
// in -- uploader
app.post(
    "/user/profile_pic",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        db.storeProfilePic(
            req.session.user_id,
            `https://s3.amazonaws.com/spicedling/${req.file.filename}`
        )
            .then(({ rows }) => {
                req.session.profile_pic = rows[0].profile_pic;
                rows[0].profile_pic &&
                    res.json({
                        serverSuccess: true,
                        updatedInfo: rows[0],
                    });
            })
            .catch((err) => {
                console.log(`>>> ${fln} >> Error in /POST/profile_pic`, err);
                res.json({ serverSuccess: false });
            });
    }
);

// --- Edit Bio
app.post("/user/editbio.json", (req, res) => {
    const { bio } = req.body;
    db.upsertBio(req.session.user_id, bio)
        .then(({ rows }) => {
            console.log("rows[0]", rows[0]);
            res.json({
                serverSuccess: true,
                updatedInfo: rows[0],
            });
        })
        .catch((err) => {
            console.log(`>>> ${fln} >> Error in upsertBio`, err);
            res.json({ serverSuccess: false });
        });
});

// --- Edit User Info
app.post("/user/edituserinfo.json", (req, res) => {
    const { first, last, email } = req.body;
    if (!first || !last || !email) {
        return res.json({ serverSuccess: false });
    }
    db.updateUserInfo(first, last, email, req.session.user_id)
        .then(({ rows }) => {
            console.log("rows[0]", rows[0]);
            res.json({
                serverSuccess: true,
                updatedInfo: rows[0],
            });
        })
        .catch((err) => {
            console.log(`>>> ${fln} >> Error in upsertBio`, err);
            res.json({ serverSuccess: false });
        });
});

//=============================== Reset Password =========================================//

// ---- Get Code
app.post("/pass/getcode.json", (req, res) => {
    const { email } = req.body;
    ///////////////////////// +++ generate secret code
    const secretCode = "dSDO32GF";

    db.storeSecretCode(email, secretCode)
        .then(({ rows }) => {
            // returns from db --> email
            console.log("01 >> after storeSecretCode >> rows[0]", rows[0]);
            res.json({ serverSuccess: true });
        })
        .catch((err) => {
            console.log(`error in ${fln} >> getSecretCode`, err);
            res.json({ serverSuccess: false });
        });
});

app.post("/pass/checkcode.json", (req, res) => {
    const { email, inputSecretCode } = req.body;
    db.getSecretCode(email)
        .then(({ rows }) => {
            console.log("02 >> rows[0]", rows[0]);
            const storedSecretCode = rows[0].stored_code;
            storedSecretCode === inputSecretCode
                ? res.json({ serverSuccess: true })
                : res.json({ serverSuccess: false });
        })
        .catch((err) => {
            console.log(`>>> ${fln} >> Error in /pass/checkcode`, err);
            res.json({ serverSuccess: false });
        });
});

app.post("/pass/setnewpass.json", (req, res) => {
    const { email, newPass, passConfirm } = req.body;
    return newPass !== passConfirm
        ? res.json({ serverSuccess: false })
        : db
              .updatePass(email, newPass)
              .then(({ rows }) => {
                  console.log(" 03>> rows[0]", rows[0]); // returning email from db
                  // res.json(rows[0]);
                  res.json({ serverSuccess: true });
              })
              .catch((err) => {
                  console.log(`>>> ${fln} >> Error in /pass/setnewpass`, err);
                  res.json({ serverSuccess: false });
              });
});

//================================= Find Other Users =========================================//

// --- Get most recent people
app.get("/api/search", (req, res) => {
    console.log(`>>> ${fln} RECENT users`);
    db.findRecentUsers()
        .then(({ rows }) => {
            console.log("FIND most recent ppl: rows", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log(`>>> ${fln} >> Error in route`, err);
        });

    //dbq -- most recent users
    // return arr of users (w user data)
    // client --> map render the array
});

// --- Search for other People
app.get("/api/search/:searchInput", (req, res) => {
    const { searchInput } = req.params;

    return !searchInput
        ? db.findRecentUsers()
        : db
              .findMatchingUsers(searchInput)
              .then(({ rows }) => {
                  console.log("FIND ppl: rows", rows);
                  res.json(rows);
              })
              .catch((err) => {
                  console.log(`>>> ${fln} >> Error in route`, err);
              });
});

// --- Get Other User Profile
app.get("/api/get-user-data/:user_id", (req, res) => {
    const { user_id } = req.params;
    // if (user_id == req.session.user_id) {
    //     return res.json({isMyOwnProfile: true});
    // }
    db.getUserData(user_id)
        .then(({ rows }) => {
            rows[0]
                ? res.json({ serverSuccess: true, userInfo: rows[0] })
                : res.json({ serverSuccess: false });
        })
        .catch((err) => {
            console.log(`>>> ${fln} >> Error in getOtherUserProfile`, err);
            res.json({ serverSuccess: false });
        });
});

//=========================== Friendships ================================//

// --- getFriendshipStatus
app.get("/friendship/get-status/:other_user_id", (req, res) => {
    const my_id = req.session.user_id;
    let { other_user_id } = req.params;
    other_user_id = parseInt(other_user_id);

    db.getFriendshipStatus(my_id, other_user_id)
        .then(({ rows }) => {
            res.json({ serverSuccess: true, friendship: rows[0] });
        })
        .catch((err) => {
            console.log(`>>> ${fln} >> Error in getFriendshipStatus`, err);
            res.json({ serverSuccess: false });
        });
});

// --- changeFriendship
app.post("/friendship/:action/:other_user_id", (req, res) => {
    // console.log("req.body", req.body); // ?? why cant i pass a body to this side??
    // const { other_user_id, action } = req.body;

    const my_id = req.session.user_id;
    const { action } = req.params;
    const other_user_id = parseInt(req.params.other_user_id);

    console.log("---- in ChangeFriendship");

    db[action](my_id, other_user_id)
        .then(({ rows }) => {
            console.log("rows[0]", rows[0]);
            res.json({ serverSuccess: true, friendship: rows[0] });
        })
        .catch((err) => {
            console.log(`>>> ${fln} >> Error in makeFriendshipRequest`, err);
            res.json({ serverSuccess: false });
        });
});

// // // --- makeFriendshipRequest
// // app.post("/friendship/make-request/:other_user_id", (req, res) => {
// //     const my_id = req.session.user_id;
// //     // const { other_user_id } = req.params;
// //     const { other_user_id } = req.body;
// //     console.log(
// //         `makeFriendshipRequest >> my_id, other_user_id`,
// //         my_id,
// //         other_user_id
// //     );

// //     db.makeFriendshipRequest(my_id, other_user_id)
// //         .then(({ rows }) => {
// //             console.log("rows[0]", rows[0]);
// //             res.json({ serverSuccess: true, friendship: rows[0] });
// //         })
// //         .catch((err) => {
// //             console.log(`>>> ${fln} >> Error in makeFriendshipRequest`, err);
// //             res.json({ serverSuccess: false });
// //         });
// // });

// // // --- acceptFriendshipRequest
// // app.post("/friendship/accept-request/:other_user_id", (req, res) => {
// //     const my_id = req.session.user_id;
// //     const { other_user_id } = req.body;
// //     console.log(
// //         `acceptFriendshipRequest >> my_id, other_user_id`,
// //         my_id,
// //         other_user_id
// //     );

// //     db.acceptFriendshipRequest(my_id, other_user_id)
// //         .then(({ rows }) => {
// //             console.log("rows[0]", rows[0]);
// //             res.json({ serverSuccess: true, friendship: rows[0] });
// //         })
// //         .catch((err) => {
// //             console.log(`>>> ${fln} >> Error in acceptFriendshipRequest`, err);
// //             res.json({ serverSuccess: false });
// //         });
// // });

// // // --- cancelFriendship
// // app.post("/friendship/cancel-friendship/:other_user_id", (req, res) => {
// //     const my_id = req.session.user_id;
// //     console.log(`req.body`, req.body);
// //     const { other_user_id } = req.body;
// //     console.log(
// //         `cancelFriendship >> my_id, other_user_id`,
// //         my_id,
// //         other_user_id
// //     );

// //     db.cancelFriendship(my_id, other_user_id)
// //         .then(({ rows }) => {
// //             console.log("rows[0]", rows[0]);
// //             res.json({ serverSuccess: true, friendship: rows[0] });
// //         })
// //         .catch((err) => {
// //             console.log(`>>> ${fln} >> Error in cancelFriendship`, err);
// //             res.json({ serverSuccess: false });
// //         });
// // });

//================================= STAR ROUTE =========================================//

// ---- Star Route
app.get("*", function (req, res) {
    console.log(">>> *");
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// =================== Listener ================= //

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening. --- http://localhost:3000");
});