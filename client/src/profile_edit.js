const fln = "profile_edit.js";
///////////////////////////////////


import ErrorMsg from "./error_msg";
import SuccessMsg from "./success_msg";

import { Component } from "react";


export class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: null, 
            error: null,
        };
        // this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount() {
        console.log("-- ProfileEdit mounted");
    }
    // handleInputChange({ target }) {
    //     this.setState({ [target.name]: target.value });
    // }
    
    render() {
        return (
            <>
                <h1>💌 ProfileEdit 💌</h1>
                
            </>
        );
    }
}