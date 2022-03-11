
import { Component } from "react";

export class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.someFn = this.someFn.bind(this);
    }
    componentDidMount() {
        console.log("-- Uploader mounted");
    }
    
    render() {
        return (
            <>
                <h1>Uploader</h1>
            </>
        );
    }
}