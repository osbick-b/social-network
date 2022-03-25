const fln = "chat.js";
///////////////////////////////////
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { ProfilePic } from "./profile_pic";
import { Link } from "react-router-dom";

import { useStatefulFields } from "./hooks/useStatefulFields";

import { latestMessagesLoaded, newMsgStored } from "./redux/messages/slice";

// import { socket } from "./socket";
// import { init } from "./socket";

// TODO -- add link to socket somewhere
// TODO -- init

// ======= Chat Component ======//

export function Chat() {
    // const dispatch = useDispatch();

    // //TODO -- insert user info
    // const info = "hey yo";

    const [{ searchInput = "" }, handleChange] = useStatefulFields();
    // const [allMessages, setAllMessages] = useState([]);

    const latestMessages = useSelector((state) =>state.messages && state.messages); //! ----- messages is not getting here!! its being assigned in slice tho

    //! =========================================================================

    useEffect(() => {
        console.log(" --- chat rendered");
    }, []);

    //! =========================================================================

    const handleInputChange = (e) => {
        console.log(`e.target.value`, e.target.value);
        // prob here use the action thing, update state and all that
    };

    const handleSubmit = () => {
        console.log("handling submit");
        // when send button --- a newChatMsg event should be emitted //! check name
    };

    // console.log(`allMessages`, allMessages);
    console.log(`${fln} >> latestMessages`, latestMessages);

    return (
        <section className="chat flex-column">
            <section className="messages-log flex-column">
                {/* //TODO --- loop through msgs array to render this -- check for state thingies */}
                {latestMessages &&
                    latestMessages.map((msg) => (
                        <div key={msg.id} className="one-msg">
                            {msg.userInfo && (
                                <ProfilePic userInfo={msg.userInfo} />
                            )}
                            <p>{msg.message}</p>
                        </div>
                    ))}
            </section>
            <form className="msg-input" onSubmit={handleSubmit}>
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
