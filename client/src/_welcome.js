import { BrowserRouter, Route } from "react-router-dom";

import { Registration } from "./registration";
import Login from "./login";
import { PassReset } from "./pass_reset";

export default function Welcome() {
    return (
        <>
            <h1>Welcome!</h1>

            <BrowserRouter>
                <>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/password/reset">
                        <PassReset/>
                    </Route>
                </>
            </BrowserRouter>
        </>
    );
}
