// const fln = "_app.js";
///////////////////////////////////


// on mount ---> get user data --> req route to get user data by id, with the id you got from login

// we need to store data somewhere --> a good place is in this.state


// default state (states that you hardcode on the component body when declaring(up there))
// it is good to set the def state with the info you're gonna need there, so anyone reading your code will know from the start what data will you be dealing with
// also good if some of the states has to be a truthy value at start

// pass down as props --> allows child components to read the values --> but NOT UPDATE them
// it's only app (or the stateful comp) that is allowed to change these values


//// Conditional Rendering patterns
// {CONDITION && COMPONENT}
// {CONDITION? COMPONENT1 : COMPONENT2}


import Logout from "./logout";
import { Uploader } from "./uploader";
import { ProfilePic } from "./profile_pic";
import { Component } from "react";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            last: "",
            user_id: "",
            profilePicUrl: "",
            isUploaderVisible: false
        };

        this.toggleUploader = this.toggleUploader.bind(this);
    }
    componentDidMount() {
        console.log("-- App mounted");
        // fetch("/user")
        // .catch((err) => {
        //     console.log(`${fln} >>> error in mount app > fetch/user`, err);
        // });
    }
    toggleUploader() {
        this.isUploaderVisible = !this.isUploaderVisible;
    }
    render() {
        return (
            <>
                <h1>App</h1>
                {this.isUploaderVisible && <Uploader />}
                <ProfilePic/>
                <Logout/>
            </>
        );
    }
}