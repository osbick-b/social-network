const fln = "_app.js";
///////////////////////////////////

import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

// import Logout from "./logout";
import { Uploader } from "./uploader";
// import { ProfilePic } from "./profile_pic";
import { Loading } from "./loading";
import { MainHeader } from "./header";

import { Chat } from "./chat";

import { MyProfile } from "./my-profile";
import { OtherUserProfile } from "./other-user-profile";
import { FindPeople } from "./search";
import FriendsAndWannabes from "./friends-wannabes";

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
                bio: false,
                profile: false,
            },
            dataAlreadyArrived: false,
        };

        this.showUpdatedValue = this.showUpdatedValue.bind(this);
        this.toggleUploader = this.toggleUploader.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
    }
    componentDidMount() {
        fetch(`/api/get-user-data/${this.props.myId}`)
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({ dataAlreadyArrived: true });
                data.serverSuccess
                    ? this.setState({ userInfo: data.userInfo })
                    : this.setState({ error: true });
            })
            .catch((err) => {
                console.log(`${fln} >>> error in mount app > fetch/user`, err);
            });
    }
    toggleUploader() {
        this.setState({ uploaderVisible: !this.state.uploaderVisible });
    }
    showUpdatedValue(propsToUpdate) {
        this.setState({
            userInfo: { ...this.state.userInfo, ...propsToUpdate },
        });
    }
    toggleEditMode(comp) {
        console.log("--toggle edit mode");
        this.setState({ editMode: { [comp]: !this.state.editMode[comp] } });
    }
    render() {
        if (!this.state.dataAlreadyArrived) {
            console.log("...loading");
        }
        // console.log(`${fln} >>> on render > this.state`, this.state);
        return (
            <>
                <BrowserRouter>
                    {!this.state.dataAlreadyArrived && <Loading />}

                    <MainHeader userInfo={this.state.userInfo} />

                    <main className="main app">
                        {/* <h2>🧶 App 🧶</h2> */}

                        <Route exact path={"/"}>
                            {this.state.dataAlreadyArrived && (
                                <MyProfile
                                    toggleEditMode={this.toggleEditMode}
                                    userInfo={this.state.userInfo}
                                    toggleUploader={this.toggleUploader}
                                    showUpdatedValue={this.showUpdatedValue}
                                    editMode={this.state.editMode}
                                />
                            )}
                        </Route>

                        <Route path={"/me/friendships"}>
                            <FriendsAndWannabes myId={this.props.myId} />
                        </Route>

                        <Route path={"/find-people"}>
                            <FindPeople />
                        </Route>

                        <Route path="/users/:otherUserId">
                            <OtherUserProfile myId={this.props.myId} />
                        </Route>

                        <Route exact path={"/chat"}>
                            <Chat />
                        </Route>

                        {this.state.uploaderVisible && (
                            <Uploader
                                user_id={this.state.userInfo.user_id}
                                toggleUploader={this.toggleUploader}
                                // showNewProfilePic={this.showNewProfilePic}
                                showUpdatedValue={this.showUpdatedValue}
                            />
                        )}
                            <div className="divider"></div>
                        <footer>
                            <h5>copyright ♥ fakebook 2022</h5>
                        </footer>
                    </main>
                </BrowserRouter>
            </>
        );
    }
}
