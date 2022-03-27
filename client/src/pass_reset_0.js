const fln = "pass_reset_0.js";
///////////////////////////////////

import ErrorMsg from "./error_msg";
import SuccessMsg from "./success_msg";
import Login from "./login";

// import { GetSecretCode } from "./pass_reset_1_get_code";
import { CheckSecretCode } from "./pass_reset_2_check_code";
import { SetNewPass } from "./pass_reset_3_set_new_pass";

import { Component } from "react";
import { Link } from "react-router-dom";

export class PassReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            success: null,
            email: "",
            secretCodeInput: "",
            hasSecretCode: false,
            isSecretCodeValid: false,
        };
        // this.someFn = this.someFn.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateState = this.updateState.bind(this);
    }
    componentDidMount() {
        console.log("-- PassReset mounted");
        console.log(`>>> ${fln} >> mount > this.state:`, this.state);
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
                console.log("01 >> after storeSecretCode >> data", data);

                data.serverSuccess && this.setState({ hasSecretCode: true });
            })
            .catch((err) => {
                console.log("!!! error in get Code", err);
                this.setState({ error: true });
            });
    }
    updateState(st) {
        console.log("-- updateState", st);
        this.setState(st);
        console.log("this.state", this.state);
    }
    render() {
        return (
            <>
                <h1>🌠 Reset Password 🌠</h1>

                {this.state.error && <ErrorMsg />}
                {this.state.success && <SuccessMsg />}
                {this.state.success && <p>All went well 😺</p>}

                {/* st 1 */}
                {!this.state.hasSecretCode && (
                    <>
                        <form>
                            <label htmlFor="email">email</label>
                            <input
                                name="email"
                                id="email"
                                type="email"
                                placeholder=""
                                onChange={this.handleInputChange}
                            />

                            <button onClick={this.handleSubmit}>Submit</button>
                        </form>
                        <Link to={"/"}>Back</Link>
                    </>
                )}

                {/* st 2 */}
                {this.state.hasSecretCode && !this.state.isSecretCodeValid && (
                    <CheckSecretCode
                        email={this.state.email}
                        // isSecretCodeValid={this.state.isSecretCodeValid}
                        updateState={this.updateState}
                    />
                )}

                {/* st 3 */}
                {this.state.isSecretCodeValid && !this.state.success && (
                    <SetNewPass
                        email={this.state.email}
                        updateState={this.updateState}
                    />
                )}

                {/* login */}
                {this.state.success && <Login />}
            </>
        );
    }
}

// has 3 views:
// 1 h1 reset pass and button to reset
// 2 input field for email and button for POST request -- getSecretCode
// 3 input field x2 for email (prefilled?) and secret code, and button for POST req -- updatePass
