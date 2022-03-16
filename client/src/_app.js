const fln = "_app.js";
///////////////////////////////////

import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

// import Logout from "./logout";
import { Uploader } from "./uploader";
import { ProfilePic } from "./profile_pic";

import { MainHeader } from "./header";
import { Profile } from "./profile";
import { OtherUserProfile } from "./other-user-profile";
import { FindPeople } from "./find-people";



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
            editMode: {
                bio:false,
                profile:false,
            },
        };

        this.showUpdatedValue = this.showUpdatedValue.bind(this);
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
    showUpdatedValue(propsToUpdate){
        this.setState({
            userInfo: { ...this.state.userInfo, ...propsToUpdate },
        });
    }
    toggleEditMode(comp) {
        console.log("--toggle edit mode");
        this.setState({ editMode: { [comp]: !this.state.editMode[comp]} });
    }
    render() {
        // console.log(`${fln} >>> on render > this.state`, this.state);
        return (
            <>
                <BrowserRouter>

                    <MainHeader userInfo={this.state.userInfo} />

                    <main className="main app">
                        <h2>🧶 App 🧶</h2>

                        <Route exact path={"/home"}>
                            <Profile
                                toggleEditMode={this.toggleEditMode}
                                userInfo={this.state.userInfo}
                                toggleUploader={this.toggleUploader}
                                showUpdatedValue={this.showUpdatedValue}
                                editMode={this.state.editMode}
                            />
                            {/* that is another way you can fo this. there are functional differences, so */}
                            <Route path="/find-people" component={FindPeople} />

                            <Route path="/user/:otherUserId">
                                {/* :otherUserId MUST match the name you gave to theis var in OtherUserProfile */}
                                <OtherUserProfile />
                            </Route>
                               

                            {this.state.uploaderVisible && (
                                <Uploader
                                    user_id={this.state.userInfo.user_id}
                                    toggleUploader={this.toggleUploader}
                                    // showNewProfilePic={this.showNewProfilePic}
                                    showUpdatedValue={this.showUpdatedValue}
                                />
                            )}
                        </Route>
                    </main>
                </BrowserRouter>
            </>
        );
    }
}
