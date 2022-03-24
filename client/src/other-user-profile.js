const fln = "other-user-profile.js";
///////////////////////////////////

import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";

import { ProfilePic } from "./profile_pic";
import { Loading } from "./loading";
import { InexistentUser } from "./inexistent-user";

import { FriendshipButton } from "./friendship-button";
import { FriendsSetDisplay } from "./friends-c-set";


export function OtherUserProfile({ myId }) {
    const [userInfo, setUserInfo] = useState({});
    const [dataAlreadyArrived, setDataAlreadyArrived] = useState(false);
    const [mutualFriends, setMutualFriends]  = useState([]);
    const { otherUserId } = useParams(); // from react router --> in app.js
    const history = useHistory();

    useEffect(() => {
        console.log("--- OtherUserProfile rendered");

        // If own Profile
        if (otherUserId == myId) {
            console.log("OH NO! ITS ME");
            return history.push("/");
        } // own profile case if handled client side

        // Get User Info
        fetch(`/api/get-user-data/${otherUserId}`)
            .then((resp) => resp.json())
            .then((data) => {
                setDataAlreadyArrived(true); // use it for loading state
                data.serverSuccess && setUserInfo(data.userInfo);

                ///
                fetch(`/api/get-user-friends/${otherUserId}`)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(" data", data);
                    data.serverSuccess && // filter friends
                    myFriendsToo = ??? // attrib them to mutuals
                    setMutualFriends(myFriendsToo);
                    // render mutuals in component
                })
                .catch((err) => {
                    console.log(`>>> ${fln} >> Error in route`, err);
                });



            })
            .catch((err) => {
                console.log(
                    `>>> ${fln} >> Error in fetch other user profile`,
                    err
                );
            });
    }, [otherUserId]);
    return (
        <>
            {!dataAlreadyArrived && <Loading />}
            {dataAlreadyArrived && !userInfo.user_id && <InexistentUser />}

            {userInfo.user_id && (
                <>
                    <h3>OtherUserProfile</h3>
                    <h1>
                        {userInfo.first} {userInfo.last}
                    </h1>
                    <FriendshipButton otherUserId={userInfo.user_id} myId={myId} />

                    <ProfilePic userInfo={userInfo} />

                    <section>
                        <h2>Profile</h2>
                        <p>
                            First Name:<span>{userInfo.first}</span>
                        </p>
                        <p>
                            Last Name:<span>{userInfo.last}</span>
                        </p>
                        <p>
                            Email:<span>{userInfo.email}</span>
                        </p>
                    </section>

                    <section>
                        <h2>Bio</h2>

                        <p>
                            Bio:<span>{userInfo.bio}</span>
                        </p>
                    </section>

                    <section>
                        <h2>Friend&apos;s Friends</h2>
                        {/* <h2>Mutual Friends</h2> */}
                        <FriendsSetDisplay  group={mutualFriends}
                    // clickHandler={handleClick}
                    messageIfEmpty={"No one here 😪"}
                    // buttons={null}
                    />
                    </section>
                </>
            )}
        </>
    );
}
