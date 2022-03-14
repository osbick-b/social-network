const fln = "header.js";
///////////////////////////////////

import { Component } from "react";
import { Link } from "react-router-dom";

import ErrorMsg from "./error_msg";
import  Logout  from "./logout";
import { ProfilePic } from "./profile_pic";


export function MainHeader({profile_pic}) {
    return (
        <header className="main">
            <h1>MainHeader</h1>
            <nav className="main">
                <Link to="/user/profile">Profile</Link>
                <Link to="/user/profile/edit">Edit Profile</Link>
                <ProfilePic url={profile_pic}/>
                <Logout />
            </nav>
        </header>
    );
}
