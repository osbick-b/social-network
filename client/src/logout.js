const fln = "logout.js";
///////////////////////////////////

import { Component } from "react";

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.logout = this.logout.bind(this);
    }
    logout(e) {
        console.log("user wants out");
        fetch("./logout")
            .then((resp) => resp.json())
            .then((data) => {
                location.reload();
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
