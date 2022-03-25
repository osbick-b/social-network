const fln = "chat-routes.js";
///////////////////////////////////

const db = require("../db");

//! =========================================================================
module.exports = (io) => {
    io.on("connection", function (socket) {
        console.log(
            `${fln} >> socket with the id ${socket.id} is now connected`
        );

        // Disconnect
        if (!socket.request.session.user_id) {
            // console.log(`${fln} >> !! socket --> no request.session.user_id`); //*OK
            return socket.disconnect(true);
        }

        const user_id = socket.request.session.user_id;
        // let message = "test message"; // TODO --- get submitted msg
        // -- pass from client emitter

        // // console.log(`>>> ${fln} > user_id:`, user_id); //*OK

        // First query to get the most recent messages
        //* --- Getting messages from db and emit them
        db.getLatestMessages()
            .then(({ rows }) => {
                console.log(`>>> ${fln} >> latestMsgs at start > rows:`, rows);
                socket.emit("chatLatestMessages", rows); //* --- here is server emitting its event
            })
            .catch((err) => {
                console.log(`>>> ${fln} >> getLatestMess`, err);
            });

        // // const { rows } = await db.getLatestMessages();
        // // console.log(`>>> ${fln} >> latestMsgs at start > rows:`, rows);
        // // socket.emit("chatLatestMessages", rows); //* --- here is server emitting its event
        // // //* --- until here ok

        //! --- dont use async bc of scope -- it gotta b rows, not rows2
        // ? --- do i need to wrap it in sth? --->>> prob in listener to newMsg event emitted by client!!!
        db.storeNewMsg(user_id, (message = "test message"))
            .then(({ rows }) => {
                console.log(`>>> ${fln} >> newChatMsg > rows:`, rows[0]);
                socket.emit("chatShowNewMsg", rows); //* --- here is server emitting its event
            })
            .catch((err) => {
                console.log(`>>> ${fln} >> chatShowNewMsg`, err);
            });


        // Disconnect
        socket.on("disconnect", function () {
            console.log(
                `${fln} >> socket with the id ${socket.id} is now disconnected`
            );
        });

        // // socket.on("thanks", function (data) {
        // //     console.log(data);
        // // });

        // // socket.emit("welcome", {
        // //     message: "Welome. It is nice to see you",
        // // });
    });
};
//! =========================================================================

//=============== Chat ===============//
