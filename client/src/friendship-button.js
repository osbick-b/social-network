const fln = "friendship-button.js";
///////////////////////////////////

import { useState, useEffect } from "react";

const FRIENDSHIP_BTN_STATUSES = {
    NO_FRIENDSHIP: {
        buttonText: "Add Friend",
        action: "makeFriendshipRequest",
    },
    PENDING_SENDER: {
        buttonText: "Cancel Request",
        action: "cancelFriendship",
    },
    PENDING_RECIPIENT: {
        buttonText: "Accept",
        action: "acceptFriendshipRequest",
        DECLINE: {
            buttonText: "Decline",
            action: "cancelFriendship",
        },
    },
    FRIENDS: {
        buttonText: "Unfriend",
        action: "cancelFriendship",
    },
};

export function FriendshipButton({ otherUserId, myId }) {
    const fbs = FRIENDSHIP_BTN_STATUSES;
    const [friendshipStatus, setFriendshipStatus] = useState();
    const [buttonText, setButtonText] = useState();
    const [buttonAction, setButtonAction] = useState();
    const [declineBtn, setDeclineBtn] = useState(fbs.PENDING_RECIPIENT.DECLINE);
    const [recipientAndPending, setRecipientAndPending] = useState(false);

    const updateFriendshipStatus = (data) => {
        !data.friendship
            ? setFriendshipStatus(fbs.NO_FRIENDSHIP)
            : data.friendship.accepted
            ? setFriendshipStatus(fbs.FRIENDS)
            : data.friendship.sender_id == myId
            ? setFriendshipStatus(fbs.PENDING_SENDER)
            : (setFriendshipStatus(fbs.PENDING_RECIPIENT),
              setRecipientAndPending(true));
    };

    useEffect(() => {
        console.log("--- FriendshipButton rendered");
        fetch(`/friendship/get-status/${otherUserId}`)
            .then((resp) => resp.json())
            .then((data) => {
                // data here is the friendship status obj, if existent
                data.serverSuccess && updateFriendshipStatus(data);
            })
            .catch((err) => {
                console.log(`>>> ${fln} >> Error in getFriendshipStatus`, err);
            });
    }, []);

    // --- Update buttonText etc based on friendshipStatus
    useEffect(() => {
        friendshipStatus && setButtonText(friendshipStatus.buttonText);
        friendshipStatus && setButtonAction(friendshipStatus.action);
    }, [friendshipStatus]);

    const handleClick = (action) => {
        fetch(`/friendship/change-friendship`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                other_user_id: otherUserId,
                action: action,
            }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                data.serverSuccess && setRecipientAndPending(false);
                data.serverSuccess && updateFriendshipStatus(data);
            })
            .catch((err) => {
                console.log(`>>> ${fln} >> friendship clickHandler`, err);
            });
    };

    return (
        <>
            {recipientAndPending && (
                <button
                    className={"primary friendship destructive"}
                    onClick={() => handleClick(declineBtn.action)}
                >
                    {declineBtn.buttonText}
                </button>
            )}
            <button
                className={"primary friendship"}
                onClick={() => handleClick(buttonAction)}
            >
                {buttonText}
            </button>
        </>
    );
}
