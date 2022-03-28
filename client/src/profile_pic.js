// const fln = "profile_pic.js";
/////////////////////////////////

export function ProfilePic({ userInfo, toggleUploader }) {
    // export function ProfilePic({ userInfo, toggleUploader }) {
    const defaultImgUrl =
        "https://i.pinimg.com/736x/31/3d/28/313d2822eca1d848e39c691a71c3cf00--animal-portraits-portrait-art.jpg";

    // console.log(`>>> ${fln} > userInfo:`, userInfo);
    let url = userInfo.profile_pic || defaultImgUrl;

    return (
        <>
            <img
                alt={`${userInfo.first} ${userInfo.last}`}
                src={url}
                className="profile-pic"
                onClick={toggleUploader}
            />
        </>
    );
}
