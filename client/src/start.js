import ReactDOM from "react-dom";
import Welcome from "./welcome";

ReactDOM.render(<Welcome/>, document.querySelector("main"));
fetch("/user/id.json")
    .then((resp) => resp.json())
    .then((data) => {
        console.log(" data", data);
        // if (!data.userId) {
        //     // server communicates that there is no userId in the cookie
        //     ReactDOM.render(<Register />, document.querySelector("main"));
        // } else {
        //     ReactDOM.render(<Logo />, document.querySelector("main")); // +++ create some component to render
        // }
    })
    .catch((err) => {
        console.log("error in ", err);
    });


function HelloWorld() {
    return <div>Hello, World!</div>;
}
