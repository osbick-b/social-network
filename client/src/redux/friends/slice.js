// this is our frineds subreducer
// we MUST make copies for every array and obj
// no mutating allowed!

export default function FriendshipsReducer(friendships = [], action) {
    console.log(`----- FriendshipsReducer is running`);
    switch (action.type) {
                    case "friendships/listed": {
                        console.log(action.type);
                        // // console.log(`action.payload.data`, action.payload.data);
                        friendships = action.payload.data;
                        break;
                    }
                    case "friend/accepted": {
                        console.log(action.type);
                        friendships = friendships.map(
                            (user) => user.user_id === action.payload.id? {...user, accepted:true}:user
                        );
                        break;
                    }
                    case "friend/cancelled": {
                        console.log(action.type);
                        friendships = friendships.filter((user) => user.user_id !== action.payload.id);
                        break;
                    }
    }

    return friendships;
}

// =============================================================================
// Actions
// =============================================================================

export function getFriendshipsList(data) {
    return {
        type: "friendships/listed",
        payload: { data },
    };
}


export function acceptFriendshipRequest(id) {
    return {
        type: "friend/accepted",
        payload: { id },
    };
}

export function cancelFriendship(id) {
    return {
        type: "friend/cancelled",
        payload: { id },
    };
}
