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
    res.json({ userCookie: req.session });
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
    console.log(`>>> ${fln} >> /login > req.body:`, req.body);
    const { email, password } = req.body;

    return Promise.all([db.getUserPass(email), db.getUserInfo(email)])
        .then(([{ rows: rowsUserPass }, { rows: rowsUserInfo }]) => {
            const storedPass = rowsUserPass[0].stored_pass;
            req.session = rowsUserInfo[0];
            return compare(password, storedPass);
        })
        .then((isMatch) => {
            isMatch
                ? res.json({ success: true })
                : (req.session = {} && res.json({ success: false }));
        })
        .catch((err) => {
            console.log("error in /login.json", err);
            return res.json({ success: false });
        });
});


// --- Logout
app.get("/logout", (req,res) => {
    req.session = {};
    res.json({user_id: null});
});


// ---- Star Route
app.get("*", function (req, res) {
    console.log(">>> *");
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// =================== Listener ================= //

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
