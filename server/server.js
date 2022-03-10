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

// =================== ROUTES ================= //

// --- Start
app.get("/user/id.json", (req, res) => {
    res.json({ userCookie: req.session }); // --- ??? can i access session (cookie) from client side??
});

// --- Register
app.post("/register.json", (req, res) => {
    const { first, last, email, password } = req.body;

    hash(password)
        .then((hashedPass) => {
            // console.log("hashedPass", hashedPass);
            return db.registerUser(first, last, email, hashedPass);
        })
        .then(({ rows }) => {
            req.session = rows[0];
            console.log(`>>> ${fln} >> register > req.session AFTER:`, req.session);
            // --- !!! the cookie setting happens here in the server. it'll only pass on a nudge saying that it all went well (or not)
            return res.json({ success: true });
        })
        .catch((err) => {
            console.log("error in server.js -- POST/register", err);
            res.json({ success: false });
        });
});

// --- Login
app.post("/login.json", (req, res) => {
    const { email, password } = req.body;
    let cookie;

    return Promise.all([db.getUserPass(email), db.getUserInfo(email)])
        .then(([{ rows: rowsUserPass }, { rows: rowsUserInfo }]) => {
            const storedPass = rowsUserPass[0].stored_pass;
            cookie = rowsUserInfo[0];
            return compare(password, storedPass);
        })
        .then((isMatch) => {
            if (isMatch) {
                req.session = cookie;
                console.log("req.session", req.session);
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("error in /login.json", err);
            return res.json({ success: false });
        });
});

// --- Logout
app.get("/logout", (req, res) => {
    console.log("req.session BEFORE", req.session);
    req.session = null;
    console.log(`${fln} >> /logout > req.session AFTER`, req.session);
    res.json({ userCookie: req.session });
});

// ---- Star Route
app.get("*", function (req, res) {
    console.log(">>> *");
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// =================== Listener ================= //

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening. --- http://localhost:3000");
});
