const express = require("express");
const app = express();

const cookieSession = require("cookie-session");

const compression = require("compression");
const path = require("path");
const mw = require("../route_middleware");

// --- Routes
const loginRoutes = require("./routes/login-routes");
const editUserRoutes = require("./routes/edit-user-routes");
const friendshipRoutes = require("./routes/friendship-routes");
const passwordRoutes = require("./routes/password-routes");
const searchUserRoutes = require("./routes/search-user-routes");

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

//============================    START    ====================================//

app.get("/start/id.json", (req, res) => {
    res.json({ userCookie: req.session }); // --- ??? can i access session (cookie) from client side??
});

// ============================ ROUTER ROUTES ========================================= //

app.use("/loguser", loginRoutes);
app.use("/user", editUserRoutes);
app.use("/friendship", friendshipRoutes);
app.use("/pass", passwordRoutes);
app.use("/api", searchUserRoutes);

//================================= STAR ROUTE =========================================//

app.get("*", function (req, res) {
    console.log(">>> *");
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// ================================== LISTENER ==================================== //

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening. --- http://localhost:3000");
});
