const fln = "socket.js";
///////////////////////////////////

// ===> module provided by teachers. take a better look at it to understand what's going on

import { io } from "socket.io-client";

import {
    latestMessagesLoaded,
    newMsgStored,
    // // chatMessagesReceived, // rename
    // // chatMessageReceived, // rename
} from "./redux/messages/slice.js";

export let socket;

// ! ---- THIS IS CLIENT ---- ! //

export const init = (store) => {
    // ? -- call init only in start.js? or do i need it anywhere else?
    if (!socket) {
        socket = io.connect();
        console.log(">>>> CONNECTED!!!!!", socket.request);

        //* --- Listener to event emitted by server
        socket.on("chatLatestMessages", (messages) => {
            console.log(
                `>>> ${fln} >> from LatestMessages > messages:`,
                messages
            );
            store.dispatch(latestMessagesLoaded(messages)); // --- fn imported from slice
        });
        // event that will be emitted in client -- chat.js
        // "chatLatestMessages" is the name of the event emitted by the server
        // will be emitted by the server at starting of app
        // will then be dispatched to the global state and made available to chat
        // ? -- do i need todo dispatch = useDispatch thing here?

        socket.on("chatShowNewMsg", (msg) => store.dispatch(newMsgStored(msg)));
        // event that puts/gets msg in db and
    }
};
