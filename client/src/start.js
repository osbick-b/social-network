const fln = "_start.js";
////////////////////////////////////

import ReactDOM from "react-dom";
import Welcome from "./_welcome";
import { App } from "./_app";

// Redux setup
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import reducer from "./redux/reducer"; // its called rootReducer in the orig reducer file. you can import it with another name bc we exported it default

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

////////////////////////////////////////////////////////
fetch("/start/id.json")
    .then((resp) => resp.json())
    .then(({ userCookie }) => {
        console.log(">>>>> userCookie /user/id.json > user_id", userCookie);
        if (userCookie.user_id) {
            ReactDOM.render(
                <Provider store={store}>
                    <App myId={userCookie.user_id} />
                </Provider>,
                document.querySelector("main")
            );
        } else {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        }
    })
    .catch((err) => {
        console.log(`error in ${fln}`, err);
    });
