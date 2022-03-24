const express = require("express");
const app = express();

const compression = require("compression");
const path = require("path");
const mw = require("../route_middleware");

// const db = require("../db");



// --- Cookie Session setup
const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret: "i'm gay",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: true,
    // secure: true, // --- *** was the cause of the cookie problem
});


// --- Sockets.io setup
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});


// --- Routes
const loginRoutes = require("./routes/login-routes");
const editUserRoutes = require("./routes/edit-user-routes");
const friendshipRoutes = require("./routes/friendship-routes");
const passwordRoutes = require("./routes/password-routes");
const searchUserRoutes = require("./routes/search-user-routes");
const chatRoutes = require("./routes/chat-routes");

// ============= Middleware ================= //

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(express.json());

app.use(cookieSessionMiddleware);

app.use(mw.logRouteInfo);

// --- Sockets.io middleware
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});


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
app.use("/chat-api", chatRoutes);




//================================= STAR ROUTE =========================================//

app.get("*", function (req, res) {
    console.log(">>> *");
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});


//================================= SOCKET CHAT ROUTE =========================================//



require("./routes/chat-routes")(io);


// ================================== LISTENERS ==================================== //

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening. --- http://localhost:3000");
});


server.listen(3001);