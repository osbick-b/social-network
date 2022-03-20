const fln = "other-user-profile.js";
///////////////////////////////////

import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { ProfilePic } from "./profile_pic";
import { Loading } from "./loading";
import { InexistentUser } from "./inexistent-user";
import { FriendshipButton } from "./friendship-button";

export function OtherUserProfile({ myId }) {
    const [userInfo, setUserInfo] = useState({});
    const [dataAlreadyArrived, setDataAlreadyArrived] = useState(false);
    const { otherUserId } = useParams(); // from react router --> in app.js
    const history = useHistory();

    useEffect(() => {
        console.log("--- OtherUserProfile rendered");
        if (otherUserId == myId) {
            console.log("OH NO! ITS ME");
            return history.push("/");
        } // own profile case if handled client side

        fetch(`/api/get-user-data/${otherUserId}`)
            .then((resp) => resp.json())
            .then((data) => {
                // if (data.isMyOwnProfile) {return history.push("/");} //  own profile case if handled server side (more to it in the server obv)
                setDataAlreadyArrived(true); // use it for loading state
                data.serverSuccess && setUserInfo(data.userInfo);
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
                    {/* what about toggle uploader? dont i need to pass it to the comp bc it expects me to?? */}

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
                        <h1>Bio</h1>

                        <p>
                            Bio:<span>{userInfo.bio}</span>
                        </p>
                    </section>
                </>
            )}
        </>
    );
}
