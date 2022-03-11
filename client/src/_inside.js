// INSIDE -- it's the page that registered users get access to once logged in. Actually *inside* our social network

import Logout from "./logout";
import { ProfilePic } from "./profile_pic";

export default function Inside() {
    return (
        <>
            <h1>🧶 ..aaand we are in! 🧶</h1>
            {/* <ProfilePic /> */}
            <Logout />
        </>
    );
}
