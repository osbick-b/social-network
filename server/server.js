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

//================================ Get User Data Etc =========================================//

// --- Get User Data
app.get("/user/profile", (req, res) => {
    db.getUserData(req.session.user_id)
        .then(({ rows }) => {
            // console.log("rows[0]", rows[0]);
            req.session = rows[0];
            console.log("/user/profile >> req.session ", req.session);
            return res.json(rows[0]);
        })
        .catch((err) => {
            console.log(`error in ${fln} >> getUserData`, err);
        });
});

// --- Store Profile Pic
app.post(
    "/user/profile_pic",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        ////// ---- ???? ERROR is in s3
        console.log(`>>> ${fln} >> storeProfilePic > req.body:`, req.file);

        db.storeProfilePic(
            req.session.user_id,
            `https://s3.amazonaws.com/spicedling/${req.file.filename}`
        )
            .then(({ rows }) => {
                console.log("rows[0]", rows[0]);
                req.session.profile_pic = rows[0].profile_pic;
                // req.session = {...rows[0]};
                console.log("req.session >> AFTER add img", req.session);
                return res.json(rows[0]);
            })
            .catch((err) => {
                console.log(`>>> ${fln} >> Error in /POST/profile_pic`, err);
                res.json({ serverSuccess: false });
            });
    }
);

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

//=============================== Reset Password =========================================//

// ---- Reset Password
app.post("/pass/getcode.json", (req, res) => {
    const { email } = req.body;
    const secretCode = "dSDO32GF";

    db.storeSecretCode(email, secretCode)
        .then(({ rows }) => {
            console.log("after storeSecretCode >> rows[0]", rows[0]);
            return res.json({ serverSuccess: true });
        })
        .catch((err) => {
            console.log(`error in ${fln} >> getSecretCode`, err);
            res.json({ serverSuccess: false });
        });

    // check if email is in db
    // IF YES --> generate secret code
    // send secret code by email to user
    // put secret code on db
    // send success response
});

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
