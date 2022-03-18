const fln = "frisndship-button.js";
///////////////////////////////////

import { useState, useEffect } from "react";

export function FriendshipButton({ otherUserId, myId }) {
    const FRIENDSHIP_BTN_STATUSES = {
        NO_FRIENDSHIP: {
            text: "Add Friend",
            action: "make friendship request",
        },
        PENDING: {
            sender: {
                text: "Unfriend",
                action: "cancel friendship request",
            },
            recipient: {
                cancel: {
                    text: "Unfriend",
                    action: "cancel friendship request",
                },
                accept: {
                    text: "Accept Request",
                    action: "accept friendship request",
                },
            },
        },
        FRIENDS: {
            text: "Unfriend",
            action: "cancel friendship request",
        },
    };

    const fbs = FRIENDSHIP_BTN_STATUSES;
    const [friendshipStatus, setFriendshipStatus] = useState({});
    const [button, setButton] = useState(friendshipStatus.text);
    const [amIRecipient, setAmIRecipient] = useState(false);
    const [acceptButtonText, setAcceptButtonText]  = useState();

    useEffect(() => {
        console.log("--- FriendshipButton rendered");
        fetch(`/friendship/get-status/${otherUserId}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(" data.friendship", data.friendship);
                console.log(`>>> ${fln} > otherUserId:`, otherUserId, "myId:", myId);

                // data here is the friendship status obj, if existent
                data.serverSuccess &&
                    setFriendshipStatus(
                        !data.friendship
                            ? fbs.NO_FRIENDSHIP
                            : !data.friendship.accepted
                            ? fbs.PENDING
                            : fbs.FRIENDS
                    );

                // If request is pending:
                if (data.friendship && !data.friendship.accepted) {
                    console.log("REQUEST PENDING");

                    data.friendship.recipient_id == myId &&
                    setAmIRecipient(true);
                    setButton();
                }
            })
            .catch((err) => {
                console.log(`>>> ${fln} >> Error in getFriendshipStatus`, err);
            });
    }, []);

    console.log(`amIRecipient`, amIRecipient);

    const handleClick = (e) => {
        console.log("click");
        fetch();
    };

    return (
        <>
            {amIRecipient && (
                <button className={"primary friendship"} onClick={handleClick}>
                    {acceptButtonText}
                </button>
            )}
            <button className={"primary friendship"} onClick={handleClick}>
                {button}
            </button>
        </>
    );
}
