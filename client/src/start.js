const fln = "_start.js";
////////////////////////////////////

import ReactDOM from "react-dom";

// --- Socket.io setup client
import { io } from "socket.io-client";
const socket = io();

import { init } from "./socket"; // TODO-- call init if user is logged in


import Welcome from "./_welcome";
import { App } from "./_app";

// Redux setup
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./redux/reducer"; // its called rootReducer in the orig reducer file. you can import it with another name bc we exported it default

import { Provider } from "react-redux";

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
            init(store); // TODO -- call init when user logged in

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
