
const fln = "password-routes.js";
///////////////////////////////////

const express = require("express");
const router = express.Router();
const db = require("../db");

module.exports = router;
// const cookieSession = require("cookie-session");

// const { compare, hash } = require("./bc");

// // -- the ones that were already here
// const compression = require("compression");
// const path = require("path");

// const mw = require("../route_middleware");

//=============================== Reset Password =========================================//

// ---- Get Code
router.post("/getcode.json", (req, res) => {
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

// --- Check Code
router.post("/checkcode.json", (req, res) => {
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
            console.log(`>>> ${fln} >> Error in /checkcode`, err);
            res.json({ serverSuccess: false });
        });
});

// --- Set New Pass
router.post("/setnewpass.json", (req, res) => {
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
                  console.log(`>>> ${fln} >> Error in /setnewpass`, err);
                  res.json({ serverSuccess: false });
              });
});
