import { Component } from "react";
import ErrorMsg from "./error_msg";

export class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: null,
            first: "",
            last: "",
            newPicUrl: "",
            error: null,
            success: null,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
    }
    componentDidMount() {
        console.log("-- Uploader mounted");
    }
    handleInputChange({ target }) {
        this.setState({ [target.name]: target.value });
        console.log("this.state INPUT CHANGE", this.state);
    }
    uploadImg(e) {
        console.log("-- user wants to upload img");
        e.preventDefault();

        const fd = new FormData();
        fd.append("newPicUrl", this.state.newPicUrl);
        fd.append("user_id", this.state.user_id);

        console.log("fd", fd);


        console.log("this.state BEFORE", this.state);
        fetch("/user/profile_pic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                this.setState(
                    data.serverSuccess ? { success: true } : { error: true }
                );
                data.serverSuccess && location.reload();
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
                    <form>
                        <label htmlFor="newPicUrl">newPicUrl</label>
                        <input
                            name="newPicUrl"
                            id="newPicUrl"
                            type="file"
                            onChange={this.inputUpdate}
                        />

                        <button onClick={this.uploadImg}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
