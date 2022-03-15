const fln = "uploader.js";
///////////////////////////////////

import { Component } from "react";
import ErrorMsg from "./error_msg";

export class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileToUpload: undefined,
            error: null,
            success: null,
            newPicUrl: undefined,
        };
        // this.selectFile = this.selectFile.bind(this);
        // this.handleImgUpload = this.handleImgUpload.bind(this);
    }
    componentDidMount() {
        console.log("-- Uploader mounted");
    }
    selectFile({ target }) {
        this.setState({ fileToUpload: target.files[0] }); // !!! --- NOT the same logic as input fields for text!
    }
    handleImgUpload(e) {
        e.preventDefault();

        console.log(
            `${fln} >> handleImgUpload > this.state.fileToUpload`,
            this.state.fileToUpload
        );

        const fd = new FormData();
        fd.append("file", this.state.fileToUpload);
        fd.append("user_id", this.props.user_id);

        fetch("/user/profile_pic", {
            method: "POST",
            body: fd,
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(
                    `${fln} >> from server > data AFTER img upload`,
                    data
                );
                this.setState(
                    data.serverSuccess ? { success: true } : { error: true }
                );
                data.serverSuccess &&
                // this.props.showNewProfilePic(data.newPicUrl);
                     this.props.showUpdatedValue({
                         profile_pic: data.newPicUrl,
                     });
                data.serverSuccess && this.props.toggleUploader();
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

                    <form onSubmit={(e) => this.handleImgUpload(e)}>
                        <label htmlFor="fileToUpload">fileToUpload</label>
                        <input
                            name="fileToUpload"
                            id="fileToUpload"
                            type="file"
                            accept="image/*"
                            required="required"
                            onChange={(e) => this.selectFile(e)}
                        />

                        <button>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
