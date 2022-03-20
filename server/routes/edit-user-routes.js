
const fln = "edit-user-routes.js";
///////////////////////////////////

const express = require("express");
const router = express.Router();

const db = require("../db");
const path = require("path");

module.exports = router;

// ============ s3 and Multer and All ======== //

const s3 = require("../s3");
const multer = require("multer");
const uidSafe = require("uid-safe");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "../uploads")); 
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


//================================ Edit User Info =========================================//

// --- Store Profile Pic
router.post(
    "/profile_pic",
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
router.post("/editbio.json", (req, res) => {
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
router.post("/edituserinfo.json", (req, res) => {
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
