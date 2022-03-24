const fln = "search-user-routes.js";
///////////////////////////////////

const express = require("express");
const router = express.Router();

const db = require("../db");

module.exports = router;


//================================= Get User's Data =========================================//


// --- Get User Profile
router.get("/get-user-data/:user_id", (req, res) => {
    const { user_id } = req.params;
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

// --- Get User Friends
router.get("/get-user-friends/:user_id", (req, res) => {
    const { user_id } = req.params;
    db.getUserData(user_id)
        .then(({ rows }) => {
            rows[0]
                ? res.json({ serverSuccess: true, userFriends: rows[0] })
                : res.json({ serverSuccess: false });
        })
        .catch((err) => {
            console.log(`>>> ${fln} >> Error in getOtherUserProfile`, err);
            res.json({ serverSuccess: false });
        });
});