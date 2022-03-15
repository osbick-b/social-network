const fln = "profile_edit.js";
///////////////////////////////////

import ErrorMsg from "./error_msg";
// import SuccessMsg from "./success_msg";

// import { Component } from "react";
import React from "react"; // --> the "long", not-decomposing version of importing

export class ProfileEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            success: null,
            error: null,
            newUserInfo: {
                first: "",
                last: "",
                email: "",
            },
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("-- ProfileEdit mounted");
        // this.setState({newUserInfo:this.props.userInfo}); // assigns current vals to newUserInfo
    }
    handleInputChange({ target }) {
        this.setState({
            newUserInfo: {
                ...this.state.newUserInfo,
                [target.name]: (target.value),
            },
        });
    }
    handleSubmit(e) {
        e.preventDefault();

        console.log(`this.state.newUserInfo AFTER   `, this.state.newUserInfo);

        fetch("/user/edituserinfo.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.newUserInfo),
        })
            .then((resp) => resp.json())
            .then((data) => {
                this.setState(
                    data.serverSuccess
                        ? {
                            success: true,
                        }
                        : { error: true }
                );
                data.serverSuccess && this.props.toggleEditMode("profile");
                data.serverSuccess &&
                    this.props.showUpdatedValue(data.updatedInfo);
            })
            .catch((err) => {
                console.log("error in POST user/register", err);
                this.setState({ error: true });
            });
    }
    render() {
        return (
            <>
                <h1>💌 ProfileEdit 💌</h1>

                {this.state.error && <ErrorMsg />}

                <form>
                    <label htmlFor="first">first</label>
                    <input
                        name="first"
                        id="first"
                        type="text"
                        value={
                            this.state.newUserInfo.first ||
                            (this.props.userInfo.first)}
                        // placeholder={this.props.userInfo.first}
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="last">last</label>
                    <input
                        name="last"
                        id="last"
                        type="text"
                        value={
                            this.state.newUserInfo.last ||
                            (this.props.userInfo.last)}
                        // placeholder={this.props.userInfo.last}
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="email">email</label>
                    <input
                        name="email"
                        id="email"
                        type="email"
                        value={
                            this.state.newUserInfo.email ||
                            (this.props.userInfo.email)}    
                        // placeholder={this.props.userInfo.email}
                        onChange={this.handleInputChange}
                    />

                    <button onClick={this.handleSubmit}>Submit</button>
                    <button
                        onClick={() => this.props.toggleEditMode("profile")}
                    >
                        cancel
                    </button>
                </form>
            </>
        );
    }
}
