const fln = "header.js";
/////////////////////////////////

import { Link } from "react-router-dom";

// import ErrorMsg from "./error_msg";
import Logout from "./logout";
import { ProfilePic } from "./profile_pic";

export function MainHeader({ userInfo }) {
    // let showMainNav = false;
    return (
        <header className="main">
            <h1>MainHeader</h1>
            <ProfilePic userInfo={userInfo} />
            {/* <ProfilePic userInfo={userInfo} onClick={showMainNav = !showMainNav} /> */}


            <nav className="main">
                <Link to="/profile">Profile</Link>
                <Logout />
            </nav>
        </header>
    );
}

// /////////////////// VERSION WITH HOOKS //////////////////////
// import { Link } from "react-router-dom";
// import { useState } from "react";


// // import ErrorMsg from "./error_msg";
// import Logout from "./logout";
// import { ProfilePic } from "./profile_pic";

// export function MainHeader({ userInfo }) {
//     const [showMainNav, setShowMainNav]  = useState(false);

    
//     return (
//         <header className="main">
//             <h1>MainHeader</h1>
//             <ProfilePic
//                 userInfo={userInfo}
//                 onClick={setShowMainNav(!showMainNav)}
//             />

//             {showMainNav && (
//                 <nav className="main">
//                     <Link to="/profile">Profile</Link>
//                     {/* <Link to="/user/profile/edit">Edit Profile</Link> */}
//                     <Logout />
//                 </nav>
//             )}
//         </header>
//     );
// }
