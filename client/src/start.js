const fln = "_start.js";
////////////////////////////////////

import ReactDOM from "react-dom";
import Welcome from "./_welcome";
// import Inside from "./_inside";
import { App } from "./_app";

ReactDOM.render(<Welcome />, document.querySelector("main"));
console.log(`>>>>> loading ${fln} <<<<<<`);

/// THIS IS NNNOOOOOOTTTT THE LOGIN/REGISTER REQUEST!!!!!!! <<<<<<<<<<<<
fetch("/user/id.json")
    .then((resp) => resp.json())
    .then(({ userCookie }) => {
        console.log(">>>>> userCookie /user/id.json > user_id", userCookie);
        if (userCookie.user_id) {
            ReactDOM.render(<App />, document.querySelector("main"));
        } else {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        }
    })
    /// THIS IS NNNOOOOOOTTTT THE LOGIN/REGISTER REQUEST!!!!!!! <<<<<<<<<<<<
    .catch((err) => {
        console.log("error in ", err);
    });
