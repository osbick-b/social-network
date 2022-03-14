const fln = "profile.js";
///////////////////////////////////

import ErrorMsg from "./error_msg";
import SuccessMsg from "./success_msg";

import { Component } from "react";
import { Link } from "react-router-dom";

export function Profile({first, last, email}) {
    return (
        <>
            <h1>Profile</h1>
            <p>
                Info:<span>My Info</span>
            </p>
            <Link to="/user/profile/edit">Edit Profile</Link>
        </>
    );
}
