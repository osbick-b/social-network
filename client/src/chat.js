const fln = "chat-group.js";
///////////////////////////////////
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { ProfilePic } from "./profile_pic";
import { Link } from "react-router-dom";

// ======= Chat Component ======//

export function Chat() {
    //TODO -- insert user info
    const info = "hey yo";

    let allMessages = [];

    const handleInputChange = (e) => {
        console.log(`e.target.value`, e.target.value);
        // prob here use the action thing, update state and all that
    };

    return (
        <section className="chat">
            <section className="messages-log">
                {/* //TODO --- loop through msgs array to render this -- check for state thingies */}
                {allMessages.length &&
                    allMessages.map((msg) => (
                        <div key={msg.id} className="one-msg">
                            <ProfilePic userInfo={msg.userInfo} />
                            {/* <textarea></textarea> */}
                        </div>
                    ))}
            </section>
            <form className="msg-input">
                {/* // TODO ---- aria invisible label or sth */}
                {/* <label htmlFor="newMsg">newMsg</label> */}
                <input
                    name="newMsg"
                    id="newMsg"
                    type="text"
                    placeholder=""
                    onChange={(e) => handleInputChange(e)}
                />
                <button>Send</button>
            </form>
        </section>
    );
}
