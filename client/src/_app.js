const fln = "_app.js";
///////////////////////////////////

import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Logout from "./logout";
import { Uploader } from "./uploader";
import { ProfilePic } from "./profile_pic";

import { MainHeader } from "./header";
import { Profile } from "./profile";
import { ProfileEdit } from "./profile_edit";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                first: "",
                last: "",
                user_id: "",
                profile_pic: undefined,
            },
            uploaderVisible: false,
            error: null,
            editMode: false,
        };

        this.showNewProfilePic = this.showNewProfilePic.bind(this);
        this.toggleUploader = this.toggleUploader.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
    }
    componentDidMount() {
        console.log("-- App mounted");
        fetch("/user/start")
            .then((resp) => resp.json())
            .then((userData) => {
                this.setState({ userInfo: userData });
            })
            .catch((err) => {
                console.log(`${fln} >>> error in mount app > fetch/user`, err);
            });
    }
    toggleUploader() {
        this.setState({ uploaderVisible: !this.state.uploaderVisible });
    }
    showNewProfilePic(newPicUrl) {
        this.setState({
            userInfo: { ...this.state.userInfo, profile_pic: newPicUrl },
        }); // +++ edit how to update obj
    }
    toggleEditMode() {
        console.log("--toggle edit mode");
        this.setState({ editMode: !this.state.editMode });
    }
    render() {
        // console.log(`${fln} >>> on render > this.state`, this.state);
        return (
            <>
                <BrowserRouter>
                    <MainHeader userInfo={this.state.userInfo} />
                    <main className="main">
                        {/* <h1>🧶 ..aaand we are in! 🧶</h1> */}

                        <h1>💜 App 💜</h1>

                        {/* <ProfilePic
                            userInfo={this.state.userInfo}
                            toggleUploader={this.toggleUploader}
                        /> */}

                        {/* ??? Does Uploader live in app? or in Profile Pic?  */}
                        {this.state.uploaderVisible && (
                            <Uploader
                                user_id={this.state.userInfo.user_id}
                                toggleUploader={this.toggleUploader}
                                showNewProfilePic={this.showNewProfilePic}
                            />
                        )}

                        <Route exact path="/user/profile">
                            {!this.state.editMode && (
                                <Profile
                                    toggleEditMode={this.toggleEditMode}
                                    userInfo={this.state.userInfo}
                                    profilePic={
                                        <ProfilePic
                                            userInfo={this.state.userInfo}
                                            toggleUploader={this.toggleUploader}
                                        />
                                    }
                                />
                            )}
                            {this.state.editMode && <ProfileEdit />}
                        </Route>
                    </main>
                </BrowserRouter>
            </>
        );
    }
}
