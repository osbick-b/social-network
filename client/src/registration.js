const fln = "registration.js";
////////////////////////////////////////////

import { Component } from "react"; // make sure your import and export processes match (with or wo default)

export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "uh-oh! :(",
        }; // MUST be called state
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("-- Registration mounted");
    }
    handleInputChange({ target }) {
        console.log("user changed input");
        this.setState({ [target.name]: target.value }, () => {
            console.log(
                `>>> ${fln} 
            handleInputChange: 
            updated state:`,
                this.state
            );
        });
    }
    handleSubmit(e) {
        e.preventDefault(); // to make sure we dont reload the page when press the button
        console.log("user pressed submit");
        console.log(`>>> ${fln} >> handleSubmit >> this.state`, this.state);
        // we can click the button, now it's time to make it send a request
        fetch("/register.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(`>>> ${fln} /register.json > data:`, data);
                if (data.success) {
                    console.log("will render INSIDE --->  user profile");
                    // ??? --- do i need ReactDom here? or do i need to then reload and render from start.js?
                } else {
                    console.log("will re-render same page with error message");
                }

                // Successful ----> what do we want to do if things go well and req is successful?
                // in error case -->

            })
            .catch((err) => {
                console.log("error in POST user/register", err);
            });
    }
    render() {
        return (
            <>
                <h1>🎀 Registration 🎀</h1>
                {/* === Conditional Rendering ===  */}

                <form>
                    <label htmlFor="first">first</label>
                    <input
                        name="first"
                        id="first"
                        type="text"
                        placeholder=""
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="last">last</label>
                    <input
                        name="last"
                        id="last"
                        type="text"
                        placeholder=""
                        onChange={this.handleInputChange}
                    />
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
            </>
        );
    }
}
