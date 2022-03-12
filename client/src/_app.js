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

        this.showNewProfilePic = this.showNewProfilePic.bind(this);
        this.toggleUploader = this.toggleUploader.bind(this);
    }
    componentDidMount() {
        console.log("-- App mounted");
        fetch("/user/profile")
            .then((resp) => resp.json())
            .then((userData) => {
                this.setState({ ...userData });
                // console.log(`${fln} >>> on mount > this.state`, this.state);
            })
            .catch((err) => {
                console.log(`${fln} >>> error in mount app > fetch/user`, err);
            });
    }
    toggleUploader() {
        this.setState({ uploaderVisible: !this.state.uploaderVisible });
    }
    showNewProfilePic(newPicUrl) {
        this.setState({ profile_pic: newPicUrl });
        this.toggleUploader();
    }
    render() {
        return (
            <>
                <h1>🧶 ..aaand we are in! 🧶</h1>

                <h1>App</h1>
                <ProfilePic
                    url={this.state.profile_pic}
                    first={this.state.first}
                    last={this.state.last}
                    toggleUploader={this.toggleUploader}
                    onChange={this.showNewProfilePic}
                />

                {this.state.uploaderVisible && (
                    <Uploader
                        user_id={this.state.user_id}
                        toggleUploader={this.toggleUploader}
                        showNewProfilePic={this.showNewProfilePic}
                    />
                )}

                <Logout />
            </>
        );
    }
}
