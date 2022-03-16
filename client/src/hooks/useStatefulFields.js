// const fln = "useStatefulFields.js";
///////////////////////////////////

import { useState } from "react";

// ============= Hook ================//

export function useStatefulFields() {
    const [values, setValues] = useState({}); // {} is the initial value of the 1st arg --> values
    const handleChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value,
        });
    };
    return [values, handleChange];
}
