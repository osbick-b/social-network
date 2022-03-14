const fln = "profile_pic.js";
/////////////////////////////////

export function ProfilePic({ url, first, last, toggleUploader }) {
// export function ProfilePic({ userInfo, toggleUploader }) {
    // const ui = userInfo;
    const defaultImgUrl =
        "https://i.pinimg.com/736x/31/3d/28/313d2822eca1d848e39c691a71c3cf00--animal-portraits-portrait-art.jpg";
    console.log(`>>> ${fln} > url:`, url);
    url = url || defaultImgUrl;
    return (
        <div className={"profile-pic"} onClick={toggleUploader}>
            <img alt={`${first} ${last}`} src={url} />
        </div>
    );
}

// default img will be stored locally

// this is a child component, it cant update values. so it'll have to ask parent
// parent can pass to child not only props, but also functions
// so it'll give ProfilePic a piece of functionality
