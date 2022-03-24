
const fln = "search-user-routes.js";
///////////////////////////////////

const express = require("express");
const router = express.Router();

const db = require("../db");

module.exports = router;


//================================= Find Other Users =========================================//


// // // --- Get Other User Profile
// // router.get("/get-user-data/:user_id", (req, res) => {
// //     const { user_id } = req.params;
// //     db.getUserData(user_id)
// //         .then(({ rows }) => {
// //             rows[0]
// //                 ? res.json({ serverSuccess: true, userInfo: rows[0] })
// //                 : res.json({ serverSuccess: false });
// //         })
// //         .catch((err) => {
// //             console.log(`>>> ${fln} >> Error in getOtherUserProfile`, err);
// //             res.json({ serverSuccess: false });
// //         });
// // });


// --- Get most recent people
router.get("/search", (req, res) => {
    console.log(`>>> ${fln} RECENT users`);
    db.findRecentUsers()
        .then(({ rows }) => {
            console.log("FIND most recent ppl: rows", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log(`>>> ${fln} >> Error in route`, err);
        });
});


// --- Search for other People
router.get("/search/:searchInput", (req, res) => {
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

