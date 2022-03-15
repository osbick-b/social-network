// const fln = "profile.js";
///////////////////////////////////

// import ErrorMsg from "./error_msg";
// import SuccessMsg from "./success_msg";

// import { Link } from "react-router-dom";
import { ProfileEdit } from "./profile_edit";
import { BioEdit } from "./bio_edit";
// import { Bio } from "./bio";
import { ProfilePic } from "./profile_pic";

// export function Profile({ userInfo, profilePic, toggleEditMode }) {
export function Profile({
    userInfo,
    toggleUploader,
    toggleEditMode,
    editMode,
    showUpdatedValue,
}) {
    // console.log(`${fln} > userInfo`, userInfo);
    return (
        <>
            <h1>
                {userInfo.first} {userInfo.last}
            </h1>

            <ProfilePic userInfo={userInfo} toggleUploader={toggleUploader} />

            <h2>Profile</h2>

            {editMode.profile ? (
                <ProfileEdit
                    userInfo={userInfo}
                    showUpdatedValue={showUpdatedValue}
                    toggleEditMode={toggleEditMode}
                />
            ) : (
                <section>
                    <p>
                        First Name:<span>{userInfo.first}</span>
                    </p>
                    <p>
                        Last Name:<span>{userInfo.last}</span>
                    </p>
                    <p>
                        Email:<span>{userInfo.email}</span>
                    </p>
                    <button onClick={() => toggleEditMode("profile")}>
                        Edit Profile
                    </button>
                </section>
            )}

            {editMode.bio ? (
                <BioEdit
                    userInfo={userInfo}
                    showUpdatedValue={showUpdatedValue}
                    toggleEditMode={toggleEditMode}
                />
            ) : (
                <section>
                    <h1>Bio</h1>
                    {userInfo.bio ? (
                        <p>
                            Bio:<span>{userInfo.bio}</span>
                            <button onClick={() => toggleEditMode("bio")}>
                                Edit Bio
                            </button>
                        </p>
                    ) : (
                        <button onClick={() => toggleEditMode("bio")}>
                            Add Bio
                        </button>
                    )}
                </section>
            )}
        </>
    );
}
