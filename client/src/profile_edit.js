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
            newfirst: "",
            newlast: "",
            newemail: "",
            // newUserInfo: {
            //     first: "",
            //     last: "",
            //     email: "",
            // },
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("-- ProfileEdit mounted");
        console.log("userInfo at mount",this.props.userInfo);
    }
    handleInputChange({ target }) {
        // const newInput = {};
        this.setState({[target.name]: target.value});
        this.setState({
            newUserInfo: {
                ...this.state.newUserInfo,
                [target.name]: target.value,
                // [target.name]: (target.value? target.value:this.props.userInfo[target.name]),
            },
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(`this.state.newUserInfo`, this.state.newUserInfo);

        // fetch("/user/edituserinfo.json", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(this.state),
        // })
        //     .then((resp) => resp.json())
        //     .then((data) => {
        //         console.log(`>>> ${fln} >> edit profile > data:`, data);
        //         const { newInfo } = data;
        //         this.setState(
        //             data.serverSuccess
        //                 ? {
        //                     success: true,
        //                     userInfo: { ...this.props.userInfo, newInfo },
        //                 }
        //                 : { error: true }
        //         );
        //         data.serverSuccess && this.props.showUpdatedValue(newInfo);
        //     })
        //     .catch((err) => {
        //         console.log("error in POST user/register", err);
        //         this.setState({ error: true });
        //     });
    }
    render() {
        return (
            <>
                <h1>💌 ProfileEdit 💌</h1>

                {this.state.error && <ErrorMsg />}
                {/* {this.state.success && <SuccessMsg />} */}

                <form>
                    <label htmlFor="first">first</label>
                    <input
                        name="first"
                        id="first"
                        type="text"
                        // value={this.props.userInfo.first}
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="last">last</label>
                    <input
                        name="last"
                        id="last"
                        type="text"
                        // value={this.props.userInfo.last}
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="email">email</label>
                    <input
                        name="email"
                        id="email"
                        type="email"
                        required="required"
                        // value={this.props.userInfo.email}
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
