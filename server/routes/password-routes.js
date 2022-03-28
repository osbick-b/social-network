const fln = "password-routes.js";
///////////////////////////////////

const express = require("express");
const router = express.Router();
const db = require("../db");
const { sendEmail } = require("../ses");
const cryptoRandomString = require("crypto-random-string");

module.exports = router;

const { compare, hash } = require("../bc");


const resetPassEmail = (secretCode) => ({
    message: `Here is the secret code that you need to reset your password. 
                It's only valid for 10 min, so move your ass, darling.
                
                SECRET CODE: ${secretCode}
                
                Cheers!`,
    subject: "Social Network: Reset your password",
});

//=============================== Reset Password =========================================//

// ---- Get Code
router.post("/getcode.json", (req, res) => {
    const { email } = req.body;
    console.log(email);
    ///////////////////////// +++ generate secret code
    const secretCode = cryptoRandomString({ length: 8 });
    console.log(`secretCode`, secretCode);
    const { message, subject } = resetPassEmail(secretCode);
    console.log(`message`, message);

    db.storeSecretCode(email, secretCode)
        .then(({ rows }) => {
            // returns from db --> email
            console.log("01 >> after storeSecretCode >> rows[0]", rows[0]);
            sendEmail(rows[0].email, message, subject);
        })
        .then(() => {
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
                : res.json({ serverSuccess: false, errMsg: "Sorry, code doesn't match" });
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
        : hash(newPass)
            .then((hashedPass) => {
                return db.updatePass(email, hashedPass);
            })
            .then(({ rows }) => {
                console.log(" 03>> rows[0]", rows[0]); // returning email from db
                res.json({ serverSuccess: true });
            })
            .catch((err) => {
                console.log(`>>> ${fln} >> Error in /setnewpass`, err);
                res.json({ serverSuccess: false });
            });
});
