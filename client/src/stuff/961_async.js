
/////////////////// ASYNC FUNCTIONS /////////////////

function fn() {
    return 10;
} /// returns --- 10

async function fn() {
    return 10;
} /// returns --- Promise {10}

fn().then(function (val) {
    console.log(val);
}); /// this is how you'd get to log the value of 10


// they work just like the usual then stuff, bc well, that's also async and resolved with a promise

// the beauty of it is that you can make any fn  work as async,
// and also it gives you access to the amazing JS functionality AWAIT

const files = await FileSystem.readdir(__dirname);

// it stops, but other things are happening *while it's stopped*
// the await expression awaits for oyu to get the result of that promise

// you dont need all that bunch of thens and unwrapping the value that the promise returns and all that

// if promise gets rejected tho, an actual exception occurs.
// you might want to catch it with a try...catch


async function() {
    try {
        const files = await FileSystem.readdir(__dirname);
        console.log(files.slice(0,3));
        return files.slice(0,3);
    } catch(err) {
        console.log("error!");
    }
}

// you can mix and match awaits and thens if you want,too :D

// when you await sth that isnt a promise, it gets converted into a promise
// if it aint async in nature, it'll just get resolved as quickly as possible


// remember to pay attention to things that can be done at the same time, just to optimize things a bit
