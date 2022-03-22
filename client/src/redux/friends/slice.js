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
                            (user) => user.other_user_id === action.payload.id? {...user, accepted:true}:user
                        );
                        break;
                    }
                    case "friend/cancelled": {
                        console.log(action.type);
                        friendships = friendships.filter((user) => user.other_user_id !== action.payload.id);
                        break;
                    }
                    // case "friend/request": {
                    //     console.log(action.type);
                    //     break;
                    // }
    }

    // if (action.type === "friends-and-wannabes/accept") {
    //     // do sth
    //     return [...friends, ];
    // } else if (){}

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


// export function makeFriendshipRequest( id ) {
//     return {
//         type: "friend/request",
//         payload: { id },
//     };
// }


//* SPREAD OPERATOR
// let obj = {name: "Luci"};
// let newObj = {...obj, last: "En"};

// let arr = [1,2,3];
// let newArr = [...arr, 4,5];

//* MAP --- useful method here. ARRAYS ONLY
//

//* FILTER --- useful array method
// creates a copy of array and filters it according to condition

//* SLICE ---
// creates a copy of the array, and THEN you can use whatever destructive methods you want on this copy
