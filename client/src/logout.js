const fln = "logout.js";
///////////////////////////////////

import { Component } from "react";

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.logout = this.logout.bind(this);
    }
    componentDidMount() {
        console.log("-- Logout mounted");
    }
    logout(e) {
        e.preventDefault();
        console.log("user wants out");
        fetch("/loguser/logout")
            .then((resp) => resp.json())
            .then(({ userCookie }) => {
                console.log(`${fln} >>> userCookie`, userCookie);
                location.replace("/"); // we need to redirect to start
            })
            .catch((err) => {
                console.log("error in logout", err);
            });
    }
    render() {
        return (
            <>
                <button onClick={this.logout}>Logout</button>
            </>
        );
    }
}
