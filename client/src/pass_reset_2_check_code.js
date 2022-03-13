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
        this.setState({ [target.name]: target.value[0] });
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("", );
        // +++ write fn here
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
