
// ===> module provided by teachers. take a better look at it to understand what's going on

import { io } from "socket.io-client";


import {
    chatMessagesReceived, // rename
    chatMessageReceived, // rename
} from "./redux/messages/slice.js";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatLatestMessages", (msgs) =>
            store.dispatch(chatMessagesReceived(msgs))
        );

        socket.on("newChatMsg", (msg) =>
            store.dispatch(chatMessageReceived(msg))
        );
    }
};