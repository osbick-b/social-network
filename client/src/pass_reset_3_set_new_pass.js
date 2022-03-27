const fln = "pass_reset_2.js";
///////////////////////////////////
import { Link } from "react-router-dom";

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
        // console.log("this.state", this.state);

        fetch("/pass/setnewpass.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("03 >> after setNewPass >> data", data);

                data.serverSuccess && this.props.updateState({ success: true });
            })
            .catch((err) => {
                console.log("!!! error in setNewPass", err);
                this.setState({ error: true });
            });
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
                <Link to={"/"}>Back</Link>
            </>
        );
    }
}
