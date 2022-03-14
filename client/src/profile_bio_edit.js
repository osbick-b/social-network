const fln = "profile_bio_edit.js";
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
    }
    componentDidMount() {
        console.log("-- BioEdit mounted");
    }
    handleInputChange({ target }) {
        this.setState({ [target.name]: target.value });
    }
    handleSubmit(e){
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
                    data.serverSuccess ? { success: true } : { error: true }
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
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="bioInput">Bio</label>
                    <textarea
                        name="bioInput"
                        id="bioInput"
                        type="text"
                        placeholder=""
                        onChange={(e) => this.handleInputChange(e)}
                    ></textarea>
                    <button>save</button>
                </form>
            </>
        );
    }
}
