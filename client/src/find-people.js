const fln = "find-people.js";
///////////////////////////////////

import { useState, useEffect } from "react";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { Link } from "react-router-dom";

export function FindPeople() {
    const [{ searchInput = "" }, handleChange] = useStatefulFields();
    // const [[users], handleChange] = useStatefulFields(); // useStatefulFields uses an obj, and we need an array
    const [noResults, setNoResults] = useState(false);
    const [users, setUsers] = useState([]);
    // const [searchTerm, setSearchTerm] = useState();

    // useEffect(() => {
    //     console.log(`--- FindPeople rendered `);
    //     let abort = false;
    //     if (!abort) {
    //         fetch("/api/search")
    //             .then((resp) => resp.json())
    //             .then((data) => {
    //                 setUsers(data);
    //             })
    //             .catch((err) => {
    //                 console.log(
    //                     `>>> ${fln} >> Error in fetch findMostRecentUsers`,
    //                     err
    //                 );
    //             });
    //     }
    //     return () => {
    //         abort = true;
    //     };
    // }, []);
    // console.log(`users`, users);

    useEffect(() => {
        let abort = false;
        console.log(`searchInput:  ${searchInput}`);
        // ??? where does this Abort go???
        // if (!abort) {
        fetch(`/api/search/${searchInput}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(`data`, data);
                !data[0] ? setNoResults(true) : setNoResults(false);
                setUsers(data);
            })
            .catch((err) => {
                console.log(`>>> ${fln} >> Error in fetch find people`, err);
            });
        // }
        // return () => {
        //     abort = true;
        // };
    }, [searchInput]);

    console.log(`noResults`, noResults);
    return (
        <>
            <h1>FindPeople</h1>
            <label htmlFor="searchInput">Find your buddies</label>
            <input
                name="searchInput"
                id="searchInput"
                type="text"
                onChange={handleChange}
            />
            <section>
                {noResults && <h4>Sorry, no users found 😑</h4>}
                {users.map((user) => (
                    <div key={user.user_id} className="one-user">
                        <Link to={`/users/${user.user_id}`}>
                            <img
                                alt={`${user.first} ${user.last}`}
                                src={user.profile_pic}
                            />
                            <h4>
                                {user.first} {user.last}
                            </h4>
                        </Link>
                    </div>
                ))}
            </section>
        </>
    );
}
