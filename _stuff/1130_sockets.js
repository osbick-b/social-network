/**
 * SOCKETS.io
 *
 * the server and client do what is called a Handshake, to agree on extablishing socket communication
 * without need for requests and responses as it is in http communication
 *
 * --- it's like they send a letter to one another:
 * LETTER 1 --> Hey, Let's call eachother?
 * ---> LETTER 2 <---- Yup sure!
 * *and they make a phone call and are instantly and live connected to each other*
 * ta-daaa!
 *
 *
 *
 * *-- each browser window has its own connection!
 * with its own id and stuff
 * we put listeners to these connections (and disconnections)
 *
 * *-- send data to another thingie
 * you emit events in order to send it
 * ==== Takes 2 args:
 * event name (there are some predefined ones, but you can also use any str and call it whatever you want)
 * predefined ones we'll most often use: "connection" and "disconnect"
 *
 *
 * 
 * !the emitter and the listener will always be on opposite sides of the client/server duo
 * doesnt mean like all listeners liva on one side and all emitters on the othes, 
 * but the emitter and the listener for a same event will be on opposite sides
 *
 * *==== Fundamental Syntax =====
 *
 * *== On one side:
 * event emitter
 */
socket.emit("babbling", "some string that is my data");

/**
 * *== On the other side:
 * event listener to that type of event
 */
socket.on("babbling", (data) => {
    console.log(`data`, data);
    socket.emit("thanks", {
        info: ["thank you, server", "that is absolute nonsense"],
    });
});

/**
 * once the connection is established, that's all there is to it.
 * just socket.emit and socket.on, pretty much it
 *
 *
 * *==== Sending Messages When no Connection is Established ====
 */
socket.broadcast.emit("exceptMe", "this goes to everyone except me");

socket.on("exceptMe", (data) => {
    console.log(`EXCEPT ME --> `, data);
});
/**
 * *Private messaging
 * if you store the info (user id and socket) in an object, be mindful of which one is in the key and which is in the value
 * bc there is a way that doesnt work, bc it overwrites the value when you open a new window
 *  but i forgot which one it is lol
 *
 *
 */
