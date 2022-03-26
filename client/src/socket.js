const fln = "socket.js";
///////////////////////////////////

import { io } from "socket.io-client";

import {
    latestMessagesLoaded,
    newMsgStored,
} from "./redux/messages/slice.js";

export let socket;

// ! ---- THIS IS CLIENT ---- ! //
export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        //? Event Listener  -- 01 from SERVER
        socket.on("chatLatestMessages", (messages) => {
            store.dispatch(latestMessagesLoaded(messages)); // --- fn imported from slice
        });
        // event that will be emitted in client -- chat.js
        // "chatLatestMessages" is the name of the event emitted by the server
        // will be emitted by the server at starting of app
        // will then be dispatched to the global state and made available to chat

        //? Event Listener  -- 02 from SERVER
        socket.on("displayNewMsg", (msg) => {
            store.dispatch(newMsgStored(msg));});
        // listens for new msg that was stored and retrieved in/from the db
        // dispatches it to apply to state
    }
};
