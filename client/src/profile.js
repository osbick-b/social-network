// const fln = "profile.js";
///////////////////////////////////

// import ErrorMsg from "./error_msg";
// import SuccessMsg from "./success_msg";

import { Link } from "react-router-dom";
import { ProfileEdit } from "./profile_edit";
import { Bio } from "./profile_bio";
import { BioEdit } from "./profile_bio_edit";



export function Profile({ userInfo, profilePic, toggleEditMode }) {
    // console.log(`${fln} > userInfo`, userInfo);
    return (
        <>
            <h1>
                {userInfo.first} {userInfo.last}
            </h1>
            <>{profilePic}</>
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

            <h2>Bio</h2>
            {userInfo.bio ? (
                <p>
                    Bio:<span>{userInfo.bio}</span>
                </p>
            ) : (
                <button>Add Bio</button>
            )}

            <button onClick={toggleEditMode}>Edit</button>
        </>
    );
}
