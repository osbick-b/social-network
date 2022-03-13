const fln = "pass_reset_2.js";
///////////////////////////////////


import { Component } from "react";
import ErrorMsg from "./error_msg";


export class CheckSecretCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputSecretCode: "",
            email: this.props.email || "",
            success: null,
            error: null,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("-- CheckSecretCode mounted");
        console.log(`>>> ${fln} >> mount > this.state:`, this.state);
    }
    handleInputChange({ target }) {
        this.setState({ [target.name]: target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        // console.log("this.state", this.state);

        fetch("/pass/checkcode.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("02 >> after compareCode >> data", data);

                data.serverSuccess &&
                    this.props.updateState({ isSecretCodeValid: true });
            })
            .catch((err) => {
                console.log("!!! error in compareCode", err);
                this.setState({ error: true });
            });
    }
    render() {
        return (
            <>
                <h1>CheckSecretCode</h1>

                {this.state.error && <ErrorMsg />}

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">email</label>
                    <input
                        name="email"
                        id="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="inputSecretCode">Secret code:</label>
                    <input
                        name="inputSecretCode"
                        id="inputSecretCode"
                        type="text"
                        placeholder=""
                        onChange={(e) => this.handleInputChange(e)}
                    />
                    <button>Submit</button>
                </form>
            </>
        );
    }
}
