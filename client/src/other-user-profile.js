const fln = "other-user-profile.js";
///////////////////////////////////

import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";

export function OtherUserProfile() {
    const [user, setUser] = useState({});
    const { otherUserId } = useParams(); // from react router --> in app.js
    const history = useHistory();
    console.log(`history`, history);

    useEffect(() => {
        let abort = false;
        console.log("--- OtherUserProfile rendered");

        if (!abort) {
            // decides id user exists or not kinda i think
            // also handles if we're trying to access out own profile or not
            if (otherUserId === "myOwnId") {
                history.push("/home"); // own profile --> redirect to "/" route
            }
        }

        return () => {
            abort = true;
        };
    }, []); // to make sure the useEffect only runs in the 1st render, pass an empty array as 2nd arg
    return (
        <>
            <h1>OtherUserProfile</h1>
        </>
    );
}
