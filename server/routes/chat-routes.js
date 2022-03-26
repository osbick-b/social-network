const fln = "chat-routes.js";
///////////////////////////////////

const db = require("../db");

module.exports = (io) => {
    io.on("connection", function (socket) {
        console.log(
            `${fln} >> socket with the id ${socket.id} is now connected`
        );

        // Disconnect
        if (!socket.request.session.user_id) {
            return socket.disconnect(true);
        }


        const user_id = socket.request.session.user_id;

        db.getLatestMessages()
            .then(({ rows }) => {
                rows = rows.map((row) => row = {userInfo:{user_id: row.user_id, first: row.first, last:row.last, profile_pic: row.profile_pic}, ...row});
                //? Event Emitter -- 01 SERVER
                socket.emit("chatLatestMessages", rows); //* --- here is server emitting its event
            })
            .catch((err) => {
                console.log(`>>> ${fln} >> getLatestMessages`, err);
            });

        //! =========================================================================

        //? Event Listener  -- 03 from CLIENT
        socket.on("userWroteNewMsg", (newMsg) => {
            let newMsgObj = {};
            db.storeNewMsg(user_id, newMsg)
                .then(({ rows }) => {
                    console.log(`>>> ${fln} >> newChatMsg > rows:`, rows[0]);
                    //? Event Emitter -- 02 SERVER
                    newMsgObj = {...rows[0]};
                    return db.getUserNameAndPic(user_id);
                })
                .then(({ rows }) => {
                    newMsgObj = { ...newMsgObj, userInfo: rows[0] };
                    io.emit("displayNewMsg", newMsgObj); //* --- here is server emitting its event
                })
                
                
                .catch((err) => {
                    console.log(`>>> ${fln} >> userWroteNewMsg`, err);
                });
        });

        //! =========================================================================

        // Event Listener -- Disconnect
        socket.on("disconnect", function () {
            console.log(
                `${fln} >> socket with the id ${socket.id} is now disconnected`
            );
        });
    });
};
