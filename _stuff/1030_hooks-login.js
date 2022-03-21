import { useState } from "react";

export function Hooks() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = () => {
        console.log(`SUBMIT > email`, email);
        console.log(`SUBMIT > password`, password);
        fetch("/login", {
            method: "POST",
            body: JSON.stringify({email,password}),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input name="email" id="email" type="text" placeholder="" onChange={setPassword(e.target.value)}/>
            <label htmlFor="password">password</label>
            <input name="password" id="password" type="text" placeholder="" onChange={}/>
            <button>Submit</button>
            
        </form>
    );
}
