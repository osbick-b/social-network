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

// also bcrypt somewhere

app.use(mw.logRouteInfo);

// =================== ROUTES ================= //

app.post("/user/register", (req, res) => {
    console.log("server.js -- POST/register: req.body", req.body);
    const { first, last, email, password } = req.body;

    hash(password)
        .then((hashedPass) => {
            console.log("hashedPass", hashedPass);
            return db.registerUser(first, last, email, password);
        })
        .then(({ rows }) => {
            console.log("--> from DB --> ", rows[0]);
            // +++ pass user info to cookie
            // +++ return sth
        })       
        .catch((err) => {
            console.log("error in server.js -- POST/register", err);
        });
});


// ---- Star Route
app.get("*", function (req, res) {
    console.log(">>> IN STAR ROUTE <<<");
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// =================== Listener ================= //

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
