import { BrowserRouter, Route } from "react-router-dom";

import { Registration } from "./registration";
import Login from "./login";
import { PassReset } from "./pass_reset_0";

export default function Welcome() {
    return (
        <>
            <header className="main-rev">
                <h1 className="logo ">fakebook</h1>
            </header>

            <BrowserRouter>
                <main className="welcome">
                    <Route exact path="/">
                        <Login />
                        {/* <Registration /> */}
                    </Route>
                    <Route path="/register">
                        <Registration />
                    </Route>
                    {/* <Route path="/login">
                        <Login />
                    </Route> */}
                    <Route path="/password/reset">
                        <PassReset />
                    </Route>
                </main>
            </BrowserRouter>
        </>
    );
}
