const fln = "useStatefulFields.js";
///////////////////////////////////

import { useState } from "react";

// ============= Hook ================//

export function useStatefulFields() {
    const [values, setValues] = useState({});
    const handleChange = ({ target }) => {
        /// !!! SPREAD existing values that already exist, esp (well only lol) arrays and objects,
        // so that the new values add to the existing ones, instead of overwriting them :)
        setValues({
            ...values,
            [target.name]: target.value,
        });
        // console.log(`>>> ${fln} > target.value:`, target.value);
    };
    return [values, handleChange];
}

////// in login/registration components (would irl be in diff files of course)

// you'd then have to import your hooks -- useStatefulFields usw

function Login() {
    const [fields, handleChange] = useStatefulFields();
    const [err, setErr] = useState(false); // ---> thing you'd have initially b4 hookifying fetch

    function submit() {
        fetch("/", {
            method: "POST",
            headers: {
                "Content Type": "application/json",
            },
            body: JSON.stringify(fields),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(" data", data);
            });
    }
}
