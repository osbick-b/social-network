const fln = "pass_reset.js";
///////////////////////////////////

import GetSecretCode from "./pass_secret_code";

// has 3 views:
// 1 h1 reset pass and button to reset
// 2 input field for email and button for POST request -- getSecretCode
// 3 input field x2 for email (prefilled?) and secret code, and button for POST req -- updatePass


export default function PassReset() {
    return (
        <>
            <GetSecretCode />
        </>
    );
}
