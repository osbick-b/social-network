const fln = "friends-wannabes.js";
///////////////////////////////////
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    getFriendshipsList,
    acceptFriendshipRequest,
    cancelFriendship,
} from "./redux/friends/slice";
import { ProfilePic } from "./profile_pic";
import { Link } from "react-router-dom";

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

    const friends = useSelector(
        (state) =>
            state.friendships &&
            state.friendships.filter((friendship) => friendship.accepted)
    );

    const pendingRequests = useSelector(
        (state) =>
            state.friendships &&
            state.friendships.filter(
                (friendship) =>
                    !friendship.accepted && friendship.sender_id == myId
            )
    );

    // console.log(`friends`, friends);
    // console.log(`wannabes`, wannabes);
    // console.log(`pendingRequests`, pendingRequests);

    const handleClick = async (buttonAction, id) => {
        console.log("CLICK!", id, buttonAction);

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
        console.log(`AFTER handleCancel -- data`, data);

        data.serverSuccess && buttonAction === "acceptFriendshipRequest"
            ? dispatch(acceptFriendshipRequest(id))
            : dispatch(cancelFriendship(id));
    };

    return (
        <section>
            <h2>Wannabes</h2>
            {/* {friends[0] && (
                <FriendsSetDisplay
                    group={friends}
                    clickHandler={handleClick}
                    messageIfEmpty={"No one here 😪"}
                    buttons={{
                        cancel: { action: "cancelFriendship", text: "Decline" },
                        accept: { action: "acceptFriendshipRequest", text: "Accept" },
                    }}
                />
            )} */}
            <section className="friendships-group">
                {wannabes[0] &&
                    wannabes.map((user, i) => (
                        <div key={i}>
                            <Link to={`/users/${user.other_user_id}`}>
                                <ProfilePic userInfo={user} />
                                <h5>
                                    {user.first} {user.last}
                                </h5>
                            </Link>
                            <button
                                name={"acceptFriendshipRequest"}
                                onClick={(e) =>
                                    handleClick(
                                        e.target.name,
                                        user.other_user_id
                                    )
                                }
                            >
                                Accept
                            </button>
                            <button
                                name={"cancelFriendship"}
                                onClick={(e) =>
                                    handleClick(
                                        e.target.name,
                                        user.other_user_id
                                    )
                                }
                            >
                                Decline
                            </button>
                        </div>
                    ))}
                {!wannabes[0] && <h5> No wannabes 💔 </h5>}
            </section>

            <h2>Pending Requests</h2>
            <section className="friendships-group">
                {pendingRequests[0] &&
                    pendingRequests.map((user, i) => (
                        <div key={i}>
                            <Link to={`/users/${user.other_user_id}`}>
                                <ProfilePic userInfo={user} />
                                <h5>
                                    {user.first} {user.last}
                                </h5>
                            </Link>
                            <button
                                name={"cancelFriendship"}
                                onClick={(e) =>
                                    handleClick(
                                        e.target.name,
                                        user.other_user_id
                                    )
                                }
                            >
                                Cancel Request
                            </button>
                        </div>
                    ))}
                {!pendingRequests[0] && <h5> No Pending requests 💔 </h5>}
            </section>

            <h2>Friends</h2>
            <section className="friendships-group">
                {friends[0] &&
                    friends.map((user, i) => (
                        <div key={i}>
                            <Link to={`/users/${user.other_user_id}`}>
                                <ProfilePic userInfo={user} />
                                <h5>
                                    {user.first} {user.last}
                                </h5>
                            </Link>
                            <button
                                name={"cancelFriendship"}
                                onClick={(e) =>
                                    handleClick(
                                        e.target.name,
                                        user.other_user_id
                                    )
                                }
                            >
                                Unfriend
                            </button>
                        </div>
                    ))}
                {!friends[0] && <h5>No friends yet 😭😭😭</h5>}
            </section>
        </section>
    );
}

// TODO -- create a route for it in app
