const fln = "pass_reset.js";
///////////////////////////////////

import GetSecretCode from "./pass_secret_code";
import ErrorMsg from "./error_msg";


// has 3 views:
// 1 h1 reset pass and button to reset
// 2 input field for email and button for POST request -- getSecretCode
// 3 input field x2 for email (prefilled?) and secret code, and button for POST req -- updatePass


import { Component } from "react";

export class PassReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            success: null,
            email: "",
        };
        // this.someFn = this.someFn.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("-- PassReset mounted");
    }
    handleInputChange({ target }) {
        this.setState({ [target.name]: target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        // console.log("this.state", this.state);

        fetch("/pass/getcode.json", {
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
                console.log("!!! error in passreset", err);
                this.setState({ error: true });
            });
    }
    render() {
        return (
            <>
                <h1>🌠 Reset Password 🌠</h1>

                {this.state.error && <ErrorMsg />}
                {this.state.success && <p>All went well 😺</p>}

                {/* <GetSecretCode /> */}
                <label htmlFor="email">email</label>
                <input
                    name="email"
                    id="email"
                    type="email"
                    placeholder=""
                    onChange={this.handleInputChange}
                />

                <button onClick={this.handleSubmit}>Submit</button>
            </>
        );
    }
}



// export function PassReset() {
//     return (
//         <>
//             <h1>🌠 Reset Password 🌠</h1>
//             {/* <GetSecretCode /> */}
//         </>
//     );
// }
