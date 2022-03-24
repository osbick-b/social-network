const fln = "friends-wannabes.js";
///////////////////////////////////
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    getFriendshipsList,
    acceptFriendshipRequest,
    cancelFriendship,
} from "./redux/friends/slice";

import { FriendsSetDisplay } from "./friends-c-set";

export default function FriendsAndWannabes({ myId }) {
    const dispatch = useDispatch();

    useEffect(() => {
        fetch("/friendship/get-friendships-list")
            .then((resp) => resp.json())
            .then((data) => {
                console.log(`${fln} data`, data);
                !dispatch(getFriendshipsList(data));
            })
            .catch((err) => {
                console.log(`>>> ${fln} >> fetch Friendsips List`, err);
            });
    }, []);

    // Select Wannabes from STATE
    const wannabes = useSelector(
        (state) =>
            state.friendships &&
            state.friendships.filter(
                (friendship) =>
                    !friendship.accepted && friendship.recipient_id == myId
            )
    );

    // Select Friends from STATE
    const friends = useSelector(
        (state) =>
            state.friendships &&
            state.friendships.filter((friendship) => friendship.accepted)
    );

    // Select pendingRequests from STATE
    const pendingRequests = useSelector(
        (state) =>
            state.friendships &&
            state.friendships.filter(
                (friendship) =>
                    !friendship.accepted && friendship.sender_id == myId
            )
    );

    const handleClick = async (buttonAction, id) => {
        const resp = await fetch(`/friendship/change-friendship`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                other_user_id: id,
                action: buttonAction,
            }),
        });
        const data = await resp.json();

        data.serverSuccess && buttonAction === "acceptFriendshipRequest"
            ? dispatch(acceptFriendshipRequest(id))
            : dispatch(cancelFriendship(id));
    };

    return (
        <>
            <h1>🎅 Friendships 🎅</h1>
            <h2>Friends</h2>
            {friends[0] && (
                <FriendsSetDisplay
                    group={friends}
                    clickHandler={handleClick}
                    messageIfEmpty={"No one here 😪"}
                    buttons={{
                        cancel: {
                            action: "cancelFriendship",
                            text: "Unfriend",
                        },
                    }}
                />
            )}

            <h2>Wannabes</h2>
            {wannabes[0] && (
                <FriendsSetDisplay
                    group={wannabes}
                    clickHandler={handleClick}
                    messageIfEmpty={"No one here 😪"}
                    buttons={{
                        cancel: { action: "cancelFriendship", text: "Decline" },
                        accept: {
                            action: "acceptFriendshipRequest",
                            text: "Accept",
                        },
                    }}
                />
            )}

            <h2>Pending Requests</h2>
            {pendingRequests[0] && (
                <FriendsSetDisplay
                    group={pendingRequests}
                    clickHandler={handleClick}
                    messageIfEmpty={"No one here 😪"}
                    buttons={{
                        cancel: {
                            action: "cancelFriendship",
                            text: "Cancel Request",
                        },
                    }}
                />
            )}
        </>
    );
}

