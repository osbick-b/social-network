const fln = "pass_reset_0.js";
///////////////////////////////////

import ErrorMsg from "./error_msg";

import { GetSecretCode } from "./pass_reset_1_get_code";
import { CheckSecretCode } from "./pass_reset_2_check_code";
import { SetNewPass } from "./pass_reset_3_set_new_pass";


import { Component } from "react";

export class PassReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            hasSecretCode: false,
            isSecretCodeValid: false, 
        };
        // this.someFn = this.someFn.bind(this);
        this.completeStep = this.completeStep.bind(this);
    }
    componentDidMount() {
        console.log("-- PassReset mounted");
        console.log(`>>> ${fln} >> mount > this.state:`, this.state);
    }
    completeStep(step) {
        console.log("-- completeStep", step);
        step === "getCode" && this.setState({ hasSecretCode: true });
        step === "checkCode" && this.setState({ isSecretCodeValid: true });
        console.log("this.state", this.state);
    }
    render() {
        return (
            <>
                <h1>PassReset</h1>

                {this.state.error && <ErrorMsg />}
                {this.state.success && <p>All went well 😺</p>}

                {!this.state.hasSecretCode && (
                    <GetSecretCode
                        hasSecretCode={this.state.hasSecretCode}
                        completeStep={this.completeStep}
                    />
                )}
                {this.state.hasSecretCode && (
                    <CheckSecretCode
                        email={this.state.email}
                        isSecretCodeValid={this.state.isSecretCodeValid}
                        completeStep={this.completeStep}
                    />
                )}
                {this.state.isSecretCodeValid && (
                    <SetNewPass email={this.state.email} />
                )}
            </>
        );
    }
}

// has 3 views:
// 1 h1 reset pass and button to reset
// 2 input field for email and button for POST request -- getSecretCode
// 3 input field x2 for email (prefilled?) and secret code, and button for POST req -- updatePass

