// const fln = "profile.js";
///////////////////////////////////

// import ErrorMsg from "./error_msg";
// import SuccessMsg from "./success_msg";

import { Link } from "react-router-dom";

export function Profile({userInfo}) {
    // console.log(`${fln} > userInfo`, userInfo);
    return (
        <>
            <h1>Profile</h1>

            <p>
                Info:<span>{userInfo.first}</span>
            </p>

            <Link to="/user/profile/edit">Edit Profile</Link>
        </>
    );
}
