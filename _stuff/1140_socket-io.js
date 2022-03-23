/** === 3 EVENTS IN TOTAL:
 * 2 emitted by server and listened for by client
 * 1 emitted by client and listened for by server
 *
 * 1. when a client connects, server sends them 10 most recent msgs at that time
 *
 *
 *
 */

/** ===== Redux part
 *  we use redux bc it makes things easier, namedly making the component update automatically
 * wr sure can do it without redux, but it would take way more work to make it work nicely
 * bc we wand msgs stored in a global place of some sort
 *
 * like if we are already using redux in the proj, we use it for chat
 * but if not, then maybe its not worth it implementing redux just
 */

//? ---- what is process.env ?

/** ==== Cookies ====
 *
 * socket msgs dont carry cookies w them bc its all so lightweight and all
 * BUT you can use a liddleware to upgrade the socket "call",
 * so it makes sure that the express middlewate gets applied to the socket thingies as well
 * and then can thus carry cookies :)
 *
 *
 * --- When you get the handshake request, you will apply it
 * !look server.js
 *
 *
 *
 */

//! always try to centralize your event listeners in one place (for ex sockets.js),
//! so you dont have repeated listeners by accident!
