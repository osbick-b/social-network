// const fln = "header.js";
// /////////////////////////////////

// import { Link } from "react-router-dom";

// // import ErrorMsg from "./error_msg";
// import Logout from "./logout";
// import { ProfilePic } from "./profile_pic";

// export function MainHeader({ userInfo }) {
//     // let showMainNav = false;
//     return (
//         <header className="main">
//             <h1>MainHeader</h1>
//             <ProfilePic userInfo={userInfo} />
//             {/* <ProfilePic userInfo={userInfo} onClick={showMainNav = !showMainNav} /> */}


//             <nav className="main">
//                 <Link to="/profile">Profile</Link>
//                 <Logout />
//             </nav>
//         </header>
//     );
// }

/////////////////// VERSION WITH HOOKS //////////////////////
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Logout from "./logout";
import { ProfilePic } from "./profile_pic";

// export function MainHeader({ userInfo }) {
//     const [showMainNav, setShowMainNav]  = useState(false);
//     console.log(`showMainNav`, showMainNav);

//     useEffect(() => {
        
//     }, [showMainNav]);
    
//     return (
//         <header className="main">
//             <h1>MainHeader</h1>
//             <ProfilePic
//                 userInfo={userInfo}
//                 // onClick={setShowMainNav(!showMainNav)}
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


import { Component } from "react";

export class MainHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: null,
            error: null,
            showMainNav: false,
        };
        this.toggleMainNav = this.toggleMainNav.bind(this);
    }
    componentDidMount() {
        console.log("-- MainHeader mounted");
    }
    toggleMainNav() {
        console.log(`-- toggle mainNav -- this.state.showMainNav`, this.state.showMainNav);
        this.setState({showMainNav: !this.state.showMainNav});
    }
    render() {
        return (
            <header className="main">
                <h1>MainHeader</h1>
                <div onClick={this.toggleMainNav}>
                    <ProfilePic
                        userInfo={this.props.userInfo}
                    />
                </div>

                {this.state.showMainNav && (
                    <nav className="main">
                        <Link to="/profile">Profile</Link>
                        {/* <Link to="/user/profile/edit">Edit Profile</Link> */}
                        <Logout />
                    </nav>
                )}
            </header>
        );
    }
}