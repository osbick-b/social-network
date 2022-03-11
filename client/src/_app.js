const fln = "_app.js";
///////////////////////////////////

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
            profile_pic: undefined,
            uploaderVisible: false,
            error: null,
        };

        this.toggleUploader = this.toggleUploader.bind(this);
    }
    componentDidMount() {
        console.log("-- App mounted");
        fetch("/user/profile")
            .then((resp) => resp.json())
            .then((userData) => {
                this.setState({ ...userData });
                console.log("this.state AFTER", this.state);
            })
            .catch((err) => {
                console.log(`${fln} >>> error in mount app > fetch/user`, err);
            });
    }
    toggleUploader() {
        console.log("this.state.uploaderVisible", this.state.uploaderVisible);
        this.setState({ uploaderVisible: !this.state.uploaderVisible });
        console.log("this.state in toggleupload", this.state);
    }
    render() {
        // Tomporary render
        return (
            <>
                <h1>🧶 ..aaand we are in! 🧶</h1>

                <h1>App</h1>
                <ProfilePic
                    url={this.state.profile_pic}
                    first={this.state.first}
                    last={this.state.last}
                    toggleUploader={this.toggleUploader}
                />

                {this.state.uploaderVisible && (
                    <Uploader toggleUploader={this.toggleUploader} />
                )}

                <Logout />
            </>
        );
    }
}
