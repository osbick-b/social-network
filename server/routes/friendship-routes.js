
const fln = "friendship-routes.js";
///////////////////////////////////

const express = require("express");
const router = express.Router();
const db = require("../db");
module.exports = router;

//=========================== Friendships ================================//

// --- getFriendshipStatus
router.get("/get-status/:other_user_id", (req, res) => {
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
router.post("/:action/:other_user_id", (req, res) => {
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