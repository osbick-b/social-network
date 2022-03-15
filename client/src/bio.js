const fln = "bio.js";
///////////////////////////////////


export function Bio({userInfo, toggleEditMode}) {
    console.log(`>>> ${fln}  > userInfo:`, userInfo);
    return (
        <section>
            <h1>Bio</h1>
            {userInfo.bio ? (
                <p>
                    Bio:<span>{userInfo.bio}</span>
                    <button onClick={toggleEditMode}>Edit Bio</button>
                </p>
            ) : (
                <button onClick={toggleEditMode}>Add Bio</button>
            )}
        </section>
    );
}