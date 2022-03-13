const fln = "pass_reset_2.js";
///////////////////////////////////

import { Component } from "react";
import ErrorMsg from "./error_msg";

export class SetNewPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPass: "",
            passConfirm: "",
            success: null,
            error: null,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("-- SetNewPass mounted");
        console.log(`>>> ${fln} >> mount > this.state:`, this.state);
    }
    handleInputChange({ target }) {
        this.setState({ [target.name]: target.value[0] });
    }
    handleSubmit(e) {
        e.preventDefault();
        // +++ write fn here
    }
    render() {
        return (
            <>
                <h1>SetNewPass</h1>

                {this.state.error && <ErrorMsg />}

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="newPass">password</label>
                    <input
                        name="newPass"
                        id="newPass"
                        type="password"
                        placeholder=""
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="passConfirm">confirm your password</label>
                    <input
                        name="passConfirm"
                        id="passConfirm"
                        type="password"
                        placeholder=""
                        onChange={this.handleInputChange}
                    />
                    <button>Submit</button>
                </form>
            </>
        );
    }
}
