// === Class Components Building Steps ==== //

import { Component } from "react"; // make sure your import and export processes match (with or wo default)

export class Registration extends Component {
    constructor() {
        super();
        this.state = {}; // MUST be called state
    }
    componentDidMount() {
        console.log("Registration mounted");
    }
    inputUpdate(e) {
        console.log("user changed input");
        // console.log(
        //     "which field got updated",
        //     e.target.name,
        //     "-->",
        //     target.value
        // );

        this.setState({ [e.target.name]: e.target.value }, () => {
            console.log("updated state", this.state);
        });
    }
    handleSubmit(e) {
        e.preventDefault(); // to make sure we dont reload the page when press the button
        console.log("handling submit");
        console.log("this.state", this.state);
        // we can click the button, now it's time to make it send a request
        fetch("/user/register.json", {
            method: "POST",
            headers: {
                "Content Type": "application/json",
            },
            body: JSON.stringify(this.state),
        }).then((resp) => resp.json()).then((resp) => {
            console.log("resp from POST user/register", resp);
            // Successful ----> what do we want to do if things go well and req is successful?

            // in error case --> 


        }).catch((err) => {
            console.log("error in POST user/register", err);
        });
    }
    render() {
        return (
            <>
                <h1>Registration</h1>
                 {/* === Conditional Rendering ===  */}



                <form>
                    <label htmlFor="first">first</label>
                    <input
                        name="first"
                        id="first"
                        type="text"
                        placeholder=""
                        onChange={(e) => {
                            this.inputUpdate(e);
                        }} // another way to bind things is to use the fact that here is where this method gets called and applied
                        // and arrow fns understand the "this" from the place where it gets created
                        // BUT!! it's bad for performance bc it then has to EVERY TIME create a new fn expression, and here it's ok, but in a wider and more nested context can be pretty bad
                        // (you'd have do change the original fn a bit for this arg and all)
                    />
                    <label htmlFor="last">last</label>
                    <input
                        name="last"
                        id="last"
                        type="text"
                        placeholder=""
                        onChange={this.inputUpdate}
                    />
                    <label htmlFor="email">email</label>
                    <input name="email" id="email" type="email" placeholder="" onChange={this.inputUpdate}/>
                    
                    <label htmlFor="password">password</label>
                    <input name="password" id="password" type="password" placeholder="" onChange={this.inputUpdate}/>
                    
                    <button click="handleSubmit">Submit</button>
                </form>
            </>
        );
    }
}
