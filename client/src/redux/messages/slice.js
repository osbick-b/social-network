// we MUST make copies for every array and obj
// no mutating allowed!

// CHAT MESSAGES SLICE //
//! =========================================================================

export default function ChatReducer(messages = [], action) {
    switch (action.type) {
                    case "latestMessages/loaded": {
                        console.log(action.type);
                        messages = action.payload.data;
                        break;
                    }
                    case "newMessage/received": {
                        console.log(action.type);
                        messages = [...messages, ...action.payload.data];
                        //TODO -- check order of adding based on odred of selection in db
                        break;
                    }
    }

    return messages;
}

//! =========================================================================

// =============================================================================
// Actions
// =============================================================================

export function latestMessagesLoaded(data) {
    return {
        type: "latestMessages/loaded",
        payload: { data },
    };
}

export function newMsgReceived(data) {
    // ? --- data?
    return {
        type: "newMessage/received",
        payload: { data },
    };
}

// do the state handling thing. check part 10 file

// GENERAL WHAT ELSE

// !!! check the variable names in all files to assure match!

// -- create table
// -- create queries (insert and select)
// -- create server routes

// =============================================================================
// model cases from friendships slice
// =============================================================================

// case "friend/accepted": {
//     console.log(action.type);
//     friendships = friendships.map(
//         (user) => user.user_id === action.payload.id? {...user, accepted:true}:user
//     );
//     break;
// }
// case "friend/cancelled": {
//     console.log(action.type);
//     friendships = friendships.filter((user) => user.user_id !== action.payload.id);
//     break;
// }
