const fln = "friends-wannabes.js";
///////////////////////////////////
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { makeFriend, getList } from "./redux/reducer";
import { ProfilePic } from "./profile_pic";

export default function FriendsAndWannabes({ myId }) {
    const dispatch = useDispatch();

    // Select Wannabes from STATE
    const wannabes = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter((friendship) => !friendship.accepted)
    );
    // console.log(`wannabes`, wannabes);

    useEffect(() => {
        fetch("/friendship/get-friends-and-wannabes")
            .then((resp) => resp.json())
            .then((data) => {
                console.log(" data", data);
                // // data.serverSuccess && data.allFriendships.map((wannabe, i) => {console.log(i, wannabe);});

                let myFriends = data.allFriendships.filter(
                    (friendship) => friendship.accepted
                );

                let myWannabes = data.allFriendships.filter(
                    (friendship) =>
                        !friendship.accepted && friendship.recipient_id == myId
                );

                let myPendingRequests = data.allFriendships.filter(
                    (friendship) =>
                        !friendship.accepted && friendship.sender_id == myId
                );

                console.log(`myFriends`, myFriends);
                console.log(`myWannabes`, myWannabes);
                console.log(`myPendingRequests`, myPendingRequests);

                // you'll get an arr of ALL the stuff
                // filter them into 2 sets: frds and wannabs
                //! dispatch(getList(data));
            })
            .catch((err) => {
                console.log(`>>> ${fln} >> fetch Friends and Wanabes`, err);
            });
    }, []);

    const handleAccept = (id) => {
        // make post req to db
        // dispatch an action to update redux
        //! dispatch(makeFriend(id));
    };

    return (
        <section>
            <h1>Friends</h1>
            <h2>Wannabes</h2>
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
    );
}

// TODO -- create a route for it in app
