// const fln = "my-profile.js";
///////////////////////////////////

// import ErrorMsg from "./error_msg";
// import SuccessMsg from "./success_msg";

// import { Link } from "react-router-dom";
import { ProfileEdit } from "./profile_edit";
import { BioEdit } from "./bio_edit";
// import { Bio } from "./bio";
import { ProfilePic } from "./profile_pic";

// export function Profile({ userInfo, profilePic, toggleEditMode }) {
export function MyProfile({
    userInfo,
    toggleUploader,
    toggleEditMode,
    editMode,
    showUpdatedValue,
}) {
    // console.log(`${fln} > userInfo`, userInfo);
    return (
        <>
            {/* <h1>🌵 Profile 🌵</h1> */}
            <h1 className="user-name">
                {userInfo.first} {userInfo.last}
            </h1>

            <ProfilePic userInfo={userInfo} toggleUploader={toggleUploader} />

            {editMode.profile ? (
                <ProfileEdit
                    userInfo={userInfo}
                    showUpdatedValue={showUpdatedValue}
                    toggleEditMode={toggleEditMode}
                />
            ) : (
                <section>
                    <h2>Profile</h2>
                    <button onClick={() => toggleEditMode("profile")}>
                        Edit Profile
                    </button>
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
                        <>
                            <button className="btn secondary" onClick={() => toggleEditMode("bio")}>
                                Edit Bio
                            </button>
                            <p>
                                Bio:<span>{userInfo.bio}</span>
                            </p>
                        </>
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
