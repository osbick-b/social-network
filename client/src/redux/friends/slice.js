// this is our frineds subreducer
// we MUST make copies for every array and obj
// no mutating allowed!

export default function FriendshipsReducer(friendships = [], action) {
    console.log(`----- FriendshipsReducer is running`);
    switch (action.type) {
                    case "friendships/list": {
                        console.log(action.type), console.log(1 + 1);
                        console.log(`action.payload.data`, action.payload.data);
                        friendships = action.payload.data;
                        break;
                    }
                    case "friend/accept": {
                        console.log(action.type), console.log(1 + 1);
                        break;
                    }
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
        type: "friendships/list",
        payload: { data },
    };
}

export function makeFriend(id) {
    return {
        type: "friend/accept",
        payload: { id },
    };
}


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
