import { Component } from "react";
import ErrorMsg from "./error_msg";

export class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPicInput: undefined,
            error: null,
            success: null,
        };
        // this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleImgUpload = this.handleImgUpload.bind(this);
    }
    componentDidMount() {
        console.log("-- Uploader mounted");
    }
    handleInputChange({ target }) {
        this.setState({ [target.name]: target.value });
        console.log("this.state INPUT CHANGE", target.name, target.value);
    }
    handleImgUpload(e) {
        console.log("-- user wants to upload img > this.state", this.state);
        console.log("this.state.newPicInput", this.state.newPicInput);
        e.preventDefault();

        const fd = new FormData();
        fd.append("file", this.state.newPicInput);
        fd.append("user_id", this.props.user_id);
        console.log("fd", fd);

        fetch("/user/profile_pic", {
            method: "POST",
            body: fd,
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data AFTER img upload", data);
                this.setState(
                    data.serverSuccess ? { success: true } : { error: true }
                );
                data.serverSuccess && this.props.showNewProfilePic(this.state.newPicInput);
            })
            .catch((err) => {
                console.log("!!! error in login", err);
                this.setState({ error: true });
            });
    }
    render() {
        return (
            <div id={"modal-bg"}>
                <div id={"modal"}>
                    <button onClick={this.props.toggleUploader}>X</button>
                    <h1>📸 Uploader 📸</h1>
                    {this.state.error && <ErrorMsg />}
                    <form onSubmit={(e) => {this.handleImgUpload(e)}}>
                        <label htmlFor="newPicInput">newPicInput</label>
                        <input
                            name="newPicInput"
                            id="newPicInput"
                            type="file"
                            onChange={(e) => {this.handleInputChange(e)}}
                        />

                        <button>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
