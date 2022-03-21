const fln = "reducer.js";
///////////////////////////////////

import { combineReducers } from "redux";
import FriendsWannabesReducer from "./friends/slice";


const rootReducer = combineReducers({});

export default rootReducer;



export function makeFriend(id) {
    return {
        type: "friends-and-wannabes/accepr",

    };
}




export function getList(data) {
    return {};
}







// *1. The basics
// import { combineReducers } from "redux";

// const rootReducer = combineReducers({});

// export default rootReducer;

// *2. Create the store (in start.js)
// Redux setup
// import { createStore, applyMiddleware } from "redux";
// import * as immutableState from "redux-immutable-state-variant";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { Provider } from "react-redux";
// import reducer from "./redux/reducer"; // its called rootReducer in the orig reducer file. you can import it with another name bc we exported it default

// const store = createStore(reducer, composeWithDevTools(applyMiddleware(immutableState.default())));

// *2.b
// and in the return, wrap <app> in
// <Provider store={store}>
//                 <App myId={userCookie.user_id} />,
//                 </Provider>


