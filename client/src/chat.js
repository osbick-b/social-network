// // const fln = "chat.js";
///////////////////////////////////
import { useSelector } from "react-redux";
import { useState } from "react";

import { ProfilePic } from "./profile_pic";
import { Link } from "react-router-dom";

import { socket } from "./socket";

// ======= Chat Component ======//

export function Chat() {
    const [newMsg, setNewMsg] = useState("");

    const messages = useSelector((state) => state.messages && state.messages);

    //! =========================================================================

    const handleSubmit = () => {
        // //? Event Emitter -- 03 CLIENT
        console.log("handling submit");
        newMsg && socket.emit("userWroteNewMsg", newMsg);
        setNewMsg("");
    };

    return (
        <>
            <section className="msg-input flex-column">
                <textarea
                    name="newMsg"
                    id="newMsg"
                    type="text"
                    value={newMsg}
                    placeholder=""
                    onChange={({ target }) => setNewMsg(target.value)}
                ></textarea>
                <button onClick={handleSubmit}>Send</button>
            </section>

            <section className=" chat messages-log flex-column">
                {messages &&
                    messages.map((msg) => (
                        <div key={msg.id} className="one-msg">
                            {msg.userInfo && (
                                <Link to={`/users/${msg.userInfo.user_id}`}>
                                    <ProfilePic userInfo={msg.userInfo} />
                                </Link>
                            )}
                            <div className="content">
                                <h4>
                                    {/* {msg.id} */}
                                    {msg.userInfo.first} {msg.userInfo.last}
                                </h4>
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    ))}
            </section>
        </>
    );
}
