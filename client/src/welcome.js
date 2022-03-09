// to render components, start with sth very very simple: just render the name of your component
import {Registration} from "./registration";

export default function Welcome() {
    return (
        <>
            <h1>Welcome!</h1>
            <Registration/>
        </>
    );
}
