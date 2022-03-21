// this is our frineds subreducer
// we MUST make copies for every array and obj
// no mutating allowed!

export default function FriendsWannabesReducer(friends = [], action){
    if (action.type === "friends-and-wannabes/accept") {
        // do sth
    }

    return friends;
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