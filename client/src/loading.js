import { useState, useEffect } from "react";

export function Loading() {
    useEffect(() => {
        // console.log("--- Loading rendered");
    });
    return (
        <div className="modal-bg">
            {/* <div className="modal"> */}
            <h1>🧭</h1>
            <h1> L O A D I N G . . .</h1>
            {/* </div> */}
        </div>
    );
}
