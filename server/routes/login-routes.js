// const fln = "login-routes.js";
///////////////////////////////////

const express = require("express");
const router = express.Router();


const db = require("../db");
const { compare, hash } = require("../bc");


module.exports = router;

//============================== Register, Login, Logout ===================================//

// --- Register
router.post("/register.json", (req, res) => {
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
router.post("/login.json", (req, res) => {
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
router.get("/logout", (req, res) => {
    req.session = null;
    res.json({ userCookie: req.session });
});
