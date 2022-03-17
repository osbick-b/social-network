const fln = "other-user-profile.js";
///////////////////////////////////

import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { ProfilePic } from "./profile_pic";
import { Loading } from "./loading";
import { InexistentUser } from "./inexistent-user";

export function OtherUserProfile(myInfo) {
    const [userInfo, setUserInfo] = useState({});
    const [dataAlreadyArrived, setDataAlreadyArrived] = useState(false);
    const { otherUserId } = useParams(); // from react router --> in app.js
    const history = useHistory();

    useEffect(() => {
        let abort = false;
        console.log("--- OtherUserProfile rendered");
        fetch(`/api/get-user-data/${otherUserId}`)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.isMyOwnProfile) {return history.push("/");}
                setDataAlreadyArrived(true); // use it for loading state
                data.serverSuccess && setUserInfo(data.userInfo);
                console.log(`userInfo`, userInfo);
            })
            .catch((err) => {
                console.log(
                    `>>> ${fln} >> Error in fetch other user profile`,
                    err
                );
            });

        // if (!abort) {
        //     // decides id user exists or not kinda i think
        //     // also handles if we're trying to access out own profile or not
        //     if (otherUserId === myInfo.user_id) {
        //         history.push("/"); // own profile --> redirect to "/" route
        //     }
        // }

        // return () => {
        //     abort = true;
        // };
    }, [otherUserId]); // to make sure the useEffect only runs in the 1st render, pass an empty array as 2nd arg
    return (
        <>
            {!dataAlreadyArrived && <Loading />}
            {dataAlreadyArrived && !userInfo.user_id && <InexistentUser />}

            {userInfo.user_id && (
                <>
                    <h1>OtherUserProfile</h1>
                    <h1>
                        {userInfo.first} {userInfo.last}
                    </h1>

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
