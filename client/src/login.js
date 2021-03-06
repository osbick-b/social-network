// const fln = "login.js";
/////////////////////////////////

import { Component } from "react";
import ErrorMsg from "./error_msg";

import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: null,
            user_id: null,
            error: null,
            forgotPass: true,
            // added now: nothing removed instead
            userInfo: {
                email: "",
                password: "",
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("-- Login mounted");
    }
    // handleInputChange({ target }) {
    //     this.setState({ [target.name]: target.value });
    // }
    handleInputChange({ target }) {
        this.setState({ userInfo: {...this.state.userInfo, [target.name]: target.value} });
    }
    handleSubmit(e) {
        e.preventDefault();
        fetch("/loguser/login.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(this.state),
            body: JSON.stringify(this.state.userInfo),
        })
            .then((resp) => resp.json())
            .then((data) => {
                this.setState(
                    data.serverSuccess ? { success: true } : { error: true }
                );
                // data.serverSuccess && location.replace("/home");
                data.serverSuccess && location.replace("/");
            })
            .catch((err) => {
                console.log("!!! error in login", err);
                this.setState({ error: true });
            });
    }
    render() {
        return (
            <>
                <h1 className="rev">Login</h1>
                {this.state.error && <ErrorMsg />}
                <form>
                    <label htmlFor="email">email</label>
                    <input
                        name="email"
                        id="email"
                        type="email"
                        placeholder=""
                        onChange={this.handleInputChange}
                    />

                    <label htmlFor="password">password</label>
                    <input
                        name="password"
                        id="password"
                        type="password"
                        placeholder=""
                        onChange={this.handleInputChange}
                    />

                    <button onClick={this.handleSubmit}>Submit</button>
                </form>


                <Link to="/register">Not yet a member? Register here!</Link>
                <Link to="/password/reset">Forgot your password?</Link>
                {/* {this.state.forgotPass && <PassReset />} */}
            </>
        );
    }
}
