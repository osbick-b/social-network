const fln = "friends-wannabes.js";
///////////////////////////////////
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { makeFriend, getFriendshipsList } from "./redux/friends/slice";
import { ProfilePic } from "./profile_pic";

export default function FriendsAndWannabes({ myId }) {
    const dispatch = useDispatch();

    useEffect(() => {
        fetch("/friendship/get-friendships-list")
            .then((resp) => resp.json())
            .then((data) => {
                console.log(`${fln} data`, data);
                // you'll get an arr of ALL the stuff
                // filter them into 2 sets: frds and wannabs
                !dispatch(getFriendshipsList(data));
            })
            .catch((err) => {
                console.log(`>>> ${fln} >> fetch Friends and Wanabes`, err);
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

    console.log(`friends`, friends);
    console.log(`wannabes`, wannabes);
    console.log(`pendingRequests`, pendingRequests);

    const handleAccept = (id) => {
        // make post req to db
        // dispatch an action to update redux
        //! dispatch(makeFriend(id));
    };

    return (
        <section>
            <h2>Wannabes</h2>
            <section className="friendships-group">
                {wannabes &&
                    wannabes.map((wannabe, i) => (
                        <div key={i}>
                            <ProfilePic userInfo={wannabe} />
                            <h5>
                                {wannabe.first} {wannabe.last}
                            </h5>
                            <button onClick={(id) => handleAccept(id)}>
                                Accept
                            </button>
                        </div>
                    ))}
            </section>

            <h2>Pending Requests</h2>
            <section className="friendships-group">
                {pendingRequests &&
                    pendingRequests.map((pendingRequest, i) => (
                        <div key={i}>
                            <ProfilePic userInfo={pendingRequest} />
                            <h5>
                                {pendingRequest.first} {pendingRequest.last}
                            </h5>
                            <button onClick={(id) => handleAccept(id)}>
                                Accept
                            </button>
                        </div>
                    ))}
            </section>

            <h2>Friends</h2>
            <section className="friendships-group">
                {friends &&
                    friends.map((friend, i) => (
                        <div key={i}>
                            <ProfilePic userInfo={friend} />
                            <h5>
                                {friend.first} {friend.last}
                            </h5>
                            <button onClick={(id) => handleAccept(id)}>
                                Accept
                            </button>
                        </div>
                    ))}
            </section>
        </section>
    );
}

// TODO -- create a route for it in app
