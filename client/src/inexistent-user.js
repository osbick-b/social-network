import { useState, useEffect } from "react";


export function InexistentUser() {
    useEffect(() => {
        console.log("--- InexistentUser rendered");
    }, []);
    return (
        <div  className={"main-comp"} >
            <h1>💢 InexistentUser 💢</h1>
            <p>Uh-oh! This user does not exist!</p>
        </div>
    );
}


