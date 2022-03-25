const fln = "chat-routes.js";
///////////////////////////////////


const db = require("../db");


//! =========================================================================
module.exports = (io) => {
    io.on("connection", async function (socket) {
        console.log(
            `${fln} >> socket with the id ${socket.id} is now connected`
        );
    
        if (!socket.request.session.user_id) {
            console.log(`${fln} >> !! socket --> no request.session.user_id`);
            return socket.disconnect(true);
        }
        const user_id = socket.request.session.user_id;
    
        //TODO -- deal with query and response from db
        const { rows } = await db.getLatestMessages();
        socket.emit('latestMessages', rows);
    
        // Inside
        socket.on("disconnect", function () {
            console.log(`${fln} >> socket with the id ${socket.id} is now disconnected`);
        });
    
        socket.on("thanks", function (data) {
            console.log(data);
        });
    
        socket.emit("welcome", {
            message: "Welome. It is nice to see you",
        });
    }); 

};
//! =========================================================================

//=============== Chat ===============//


