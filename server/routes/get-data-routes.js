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

// --- Get Mutual Friends
router.get("/get-mutual-friends/:other_user_id", (req, res) => {
    const { other_user_id } = req.params;
    const my_id = req.session.user_id;

    db.getMutualFriends(my_id, other_user_id)
        .then(({ rows }) => {
            rows
                ? res.json({ serverSuccess: true, userFriends: rows })
                : res.json({ serverSuccess: false });
        })
        .catch((err) => {
            console.log(`>>> ${fln} >> Error in getMutualFriends`, err);
            res.json({ serverSuccess: false });
        });
});

// --- Get Recent Messages
// router.get(`/get-latest-messages/:other_user_id`, (req, res) => {
router.get(`/get-latest-messages`, (req, res) => {
    // const { other_user_id } = req.params;
    const my_id = req.session.user_id;

    //! IN PROCESS ----

    // return other_user_id
    //     ? db.getLatestMessages(my_id, other_user_id)
    //     :
    db.getLatestMessages(my_id)
        .then(({ rows }) => {
            console.log("getLatestMessages rows", rows);
            res.json({ serverSuccess: true, latestMessages: rows });
        })
        .catch((err) => {
            console.log(`>>> ${fln} >> Error in route getLatest Messages`, err);
            res.json({ serverSuccess: false });
        });
});
