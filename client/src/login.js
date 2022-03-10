const fln = "login.js";
/////////////////////////////////

import { Component } from "react";
import ErrorMsg from "./error_msg";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("-- Login mounted");
    }
    handleInputChange({ target }) {
        console.log("user changed input");
        console.log("target", target);
        this.setState({ [target.name]: target.value }, () => {
            console.log(
                `>>> ${fln} handleInputChange: updated state:`,
                this.state
            );
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("user pressed login");
        fetch("/login.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data", data);
                // --- ??? should i clear login data from this.state? if yes, how?
                this.setState({success: data.success});
                console.log("this.state", this.state);
                location.reload();
            })
            .catch((err) => {
                console.log("error in login", err);
                this.setState({ success: false });
                console.log("this.state CATCH", this.state);
            });
    }
    render() {
        return (
            <>
                <h1>Login</h1>
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
                <p>Not yet a member? </p>
                {/* <Link to=""/> */}
            </>
        );
    }
}
