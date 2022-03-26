// const fln = "messages-slice.js";
///////////////////////////////////

// CHAT MESSAGES SLICE //
export default function ChatReducer(messages = [], action) {
    switch (action.type) {
                    case "latestMessages/loaded": {
                        messages = action.payload.data;
                        break;
                    }
                    case "newMessage/stored": {
                        // // console.log(action.type);
                        messages = [action.payload.data, ...messages];
                        break;
                    }
    }

    return messages;
}

// =============================================================================
// Actions
// =============================================================================

export function latestMessagesLoaded(data) {
    return {
        type: "latestMessages/loaded",
        payload: { data },
    };
}

export function newMsgStored(data) {
    return {
        type: "newMessage/stored",
        payload: { data },
    };
}
