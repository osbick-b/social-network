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
router.post("/change-friendship", (req, res) => {
    
    const { other_user_id, action } = req.body;
    const my_id = req.session.user_id;
    
    console.log("---- in ChangeFriendship");
    // console.log(`action, other_user_id`, action, other_user_id);

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


// --- Get ALL friends and Wannabes
router.get("/get-friendships-list", (req, res) => {
    const my_id = req.session.user_id;
    // // console.log(`----get-friends-wannas ---my_id`, my_id);

    db.getAllFriendships(my_id)
        .then(({ rows }) => {
            console.log("getAllFriendships - rows", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log(`>>> ${fln} >> Error in getAllFriendships`, err);
        });
});
