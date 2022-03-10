const fln = "_start.js";
////////////////////////////////////

import ReactDOM from "react-dom";
import Welcome from "./_welcome";
import Inside from "./_inside";

ReactDOM.render(<Welcome />, document.querySelector("main"));
console.log(`>>>>> loading ${fln} <<<<<<`);

/// THIS IS NNNOOOOOOTTTT THE LOGIN/REGISTER REQUEST!!!!!!! <<<<<<<<<<<<
fetch("/user/id.json")
    .then((resp) => resp.json())
    .then(({ userCookie }) => {
        console.log(">>>>> userCookie /user/id.json > user_id", userCookie);
        // is the cookie info coming to the client side???
        if (userCookie.user_id) {
            console.log("please come inside, user");
            ReactDOM.render(<Inside/>, document.querySelector("main")); 
        } else {
            console.log("NOT ALLOWED IN :(");
            // server communicates that there is no userId in the cookie
            ReactDOM.render(<Welcome/>, document.querySelector("main"));
        }
    })
    .catch((err) => {
        console.log("error in ", err);
    });
