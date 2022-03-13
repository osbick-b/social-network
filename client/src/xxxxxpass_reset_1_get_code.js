const fln = "pass_reset_1.js";
///////////////////////////////////


import { Component } from "react";

// import ErrorMsg from "./error_msg";



export class GetSecretCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            success: null,
            email: "",
            secretCodeInput: "",
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("-- GetSecretCode mounted");
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

                data.serverSuccess && this.props.completeStep("getCode");
                // data.serverSuccess && location.reload();
            })
            .catch((err) => {
                console.log("!!! error in get Code", err);
                this.setState({ error: true });
            });
    }
    render() {
        return (
            <>
                <h1>🌠 Reset Password 🌠</h1>

                {/* {this.state.error && <ErrorMsg />}
                {this.state.success && <p>All went well 😺</p>} */}

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