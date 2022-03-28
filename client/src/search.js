const fln = "find-people.js";
///////////////////////////////////

import { useState, useEffect } from "react";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { Link } from "react-router-dom";
import { ProfilePic } from "./profile_pic";
// import { Loading } from "./loading";



export function FindPeople() {
    const [{ searchInput = "" }, handleChange] = useStatefulFields();
    const [noResults, setNoResults] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let abort = false;
        // ??? where does this Abort go???
        fetch(`/search-api/search/${searchInput}`)
            .then((resp) => resp.json())
            .then((data) => {
                !data[0] ? setNoResults(true) : setNoResults(false);
                if (!abort) {
                    setUsers(data);
                }
            })
            .catch((err) => {
                console.log(`>>> ${fln} >> Error in fetch find people`, err);
            });
        return () => {
            abort = true;
        };
    }, [searchInput]);

    return (
        <main className="search">
            <h1>FindPeople</h1>
            <label htmlFor="searchInput">Find your buddies</label>
            <input
                name="searchInput"
                id="searchInput"
                type="text"
                onChange={handleChange}
            />
            <section className="search-results flex-column">
                {noResults && <h4>Sorry, no users found 😑</h4>}
                {users.map((user) => (
                    <div key={user.user_id} className="one-user">
                        <Link to={`/users/${user.user_id}`}>
                            <ProfilePic userInfo={user}/>
                            <h4>
                                {user.first} {user.last}
                            </h4>
                        </Link>
                    </div>
                ))}
            </section>
        </main>
    );
}
