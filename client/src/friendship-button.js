import { useState, useEffect } from "react";


export function FriendshipButton() {
    useEffect(() => {
        console.log("--- FriendshipButton rendered");
    }, []);
    return (
        <button  className={"primary friendship"}>
            <h1>FriendshipButton</h1>
        </button>
    );
}