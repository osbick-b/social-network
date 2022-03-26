// const fln = "socket.js";
// ///////////////////////////////////

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
            store.dispatch(latestMessagesLoaded(messages)); 
        });

        //? Event Listener  -- 02 from SERVER
        socket.on("displayNewMsg", (msg) => {
            store.dispatch(newMsgStored(msg));});
    }
};
