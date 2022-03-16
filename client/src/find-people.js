const fln = "find-people.js";
///////////////////////////////////

import { useState, useEffect } from "react";


export function FindPeople() {
    useEffect(() => {
        console.log("--- FindPeople rendered");
    }, []);
    return (
        < >
            <h1>FindPeople</h1>
        </>
    );
}
