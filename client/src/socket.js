
// ===> module provided by teachers. take a better look at it to understand what's going on

import { io } from "socket.io-client";


import {
    latestMessagesLoaded,
    newMsgReceived,
    // // chatMessagesReceived, // rename
    // // chatMessageReceived, // rename
} from "./redux/messages/slice.js";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
        console.log(">>>> CONNECTED!!!!!", socket.request);

        // event that will be emitted in client -- chat.js
        socket.on("chatLatestMessages", (msgs) =>
        // will be emitted by the server ahead of time
        //! check name
        // will then be dispatched to the global state and made available to chat
            store.dispatch(chatMessagesReceived(msgs))
        );


        socket.on("newChatMsg", (msg) =>
            //! check name
            store.dispatch(chatMessageReceived(msg))
        );
    }
};