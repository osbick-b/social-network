// const fln = "registration.js";
////////////////////////////////////////////

import { Component } from "react";
import ErrorMsg from "./error_msg";

import { Link } from "react-router-dom";


export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: null,
            user_id: null,
            error: null,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("-- Registration mounted");
    }
    handleInputChange({ target }) {
        this.setState({ [target.name]: target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        // +++ do some input check here
        // console.log(`>>> ${fln} >> handleSubmit >> this.state`, this.state);
        fetch("/user/register.json", {
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
                <h1>🎀 Registration 🎀</h1>
                {this.state.error && <ErrorMsg />}

                <form>
                    <label htmlFor="first">first</label>
                    <input
                        name="first"
                        id="first"
                        type="text"
                        required="required"
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="last">last</label>
                    <input
                        name="last"
                        id="last"
                        type="text"
                        required="required"
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="email">email</label>
                    <input
                        name="email"
                        id="email"
                        type="email"
                        required="required"
                        onChange={this.handleInputChange}
                    />

                    <label htmlFor="password">password</label>
                    <input
                        name="password"
                        id="password"
                        type="password"
                        required="required"
                        onChange={this.handleInputChange}
                    />

                    <button onClick={this.handleSubmit}>Submit</button>
                </form>

                <Link to="/login">Already a member? Log in here!</Link>
            </>
        );
    }
}
