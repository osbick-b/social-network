// WELCOME --- is the page that users go to upon first arrival. gives them the option to either log in or register

// to render components, start with sth very very simple: just render the name of your component
import { Registration } from "./registration";
import Login from "./login";
import { PassReset } from "./pass_reset";
import Inside from "./inside";

export default function Welcome() {
    return (
        <>
            <h1>Welcome!</h1>
            {/* +++ conditional rendering */}
            {/* <Registration /> */}
            <Login/>
        </>
    );
}
