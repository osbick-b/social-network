const fln = "other-user-profile.js";
///////////////////////////////////

import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { ProfilePic } from "./profile_pic";
import { Loading } from "./loading";


export function OtherUserProfile(myInfo) {
    const [userInfo, setUserInfo] = useState({});
    const [dataAlreadyArrived, setDataAlreadyArrived]  = useState(false);
    const { otherUserId } = useParams(); // from react router --> in app.js
    const history = useHistory();
    console.log(`history`, history);
    console.log(`otherUserId`, otherUserId);

    useEffect(() => {
        let abort = false;
        console.log("--- OtherUserProfile rendered");
        fetch(`/api/get-user-data/${otherUserId}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(" data", data);
                setUserInfo(data);
                console.log(`userInfo`, userInfo);
                setDataAlreadyArrived(true); // use it for loading state
            })
            .catch((err) => {
                console.log(`>>> ${fln} >> Error in fetch other user profile`, err);
            });

        if (!abort) {
            // decides id user exists or not kinda i think
            // also handles if we're trying to access out own profile or not
            if (otherUserId === myInfo.user_id) {
                history.push("/home"); // own profile --> redirect to "/" route
            }
        }

        return () => {
            abort = true;
        };
    }, [otherUserId]); // to make sure the useEffect only runs in the 1st render, pass an empty array as 2nd arg
    return (
        <>
            {!dataAlreadyArrived && <Loading />}

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
    );
}
