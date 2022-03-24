import { ProfilePic } from "./profile_pic";
import { Link } from "react-router-dom";

export function FriendsSetDisplay({
    group,
    clickHandler,
    messageIfEmpty,
    buttons,
}) {

    return (
        <section className="friendships-group">

            {/* / ============ User =========== / */}
            {group[0] &&
                group.map((person, i) => (
                    <div key={i}>
                        <Link to={`/users/${person.user_id}`}>
                            <ProfilePic userInfo={person} />
                            <h5>
                                {person.first} {person.last}
                            </h5>
                        </Link>

                        {/* / ============ buttons =========== / */}
                        {buttons &&
                            Object.entries(buttons).map((btn, i) => {
                                return (
                                    <button
                                        key={i}
                                        name={btn[1].action}
                                        onClick={(e) =>
                                            clickHandler(
                                                e.target.name,
                                                person.user_id
                                            )
                                        }
                                    >
                                        {btn[1].text}
                                    </button>
                                );
                            })}
                    </div>
                ))}
            {!group[0] && <h5> {messageIfEmpty} </h5>}
        </section>
    );
}
