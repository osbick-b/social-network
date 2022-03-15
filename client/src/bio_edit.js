// const fln = "profile_bio_edit.js";
///////////////////////////////////

import ErrorMsg from "./error_msg";
import SuccessMsg from "./success_msg";

// import { Component } from "react";
import React from "react"; // --> the "long", not-decomposing version of importing

export class BioEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            success: null,
            error: null,
            bioInput: "",
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("-- BioEdit mounted");
    }
    handleInputChange({ target }) {
        this.setState({ [target.name]: target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        fetch("/user/editbio.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                this.setState(
                    data.serverSuccess
                        ? {
                            success: true,
                            userInfo: { ...this.state.userInfo, bio: data },
                        }
                        : { error: true }
                );
                data.serverSuccess && location.reload();
            })
            .catch((err) => {
                console.log("error in POST user/register", err);
                this.setState({ error: true });
            });
    }
    render() {
        return (
            <>
                <h1>💌 BioEdit 💌</h1>

                {this.state.error && <ErrorMsg />}
                {this.state.success && <SuccessMsg />}

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="bioInput">Bio</label>
                    <textarea
                        name="bioInput"
                        id="bioInput"
                        type="text"
                        value={this.props.userInfo.bio && this.props.userInfo.bio}
                        onChange={(e) => this.handleInputChange(e)}
                    ></textarea>
                    <button>save</button>
                    <button onClick={() => this.props.toggleEditMode("bio")}>
                        cancel
                    </button>
                </form>
            </>
        );
    }
}
