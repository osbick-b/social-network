import { ProfilePic } from "./profile_pic";
import { Link } from "react-router-dom";

export function FriendsSetDisplay({
    group,
    clickHandler,
    messageIfEmpty,
    buttons,
}) {
    console.log(`buttons`, buttons);
    console.log("---mounting Friends set display");
    return (
        <section className="friendships-group">
            {group[0] &&
                group.map((person, i) => (
                    <div key={i}>
                        <Link to={`/items/${person.other_user_id}`}>
                            <ProfilePic userInfo={person} />
                            <h5>
                                {person.first} {person.last}
                            </h5>
                        </Link>


                    



                        {buttons &&
                            Object.entries(buttons).map((btn, i) => {
                                console.log(`btn`, btn);
                                return (<button
                                    key={i}
                                    name={btn[1].action}
                                    onClick={(e) =>
                                        clickHandler(
                                            e.target.name,
                                            person.other_user_id
                                        )
                                    }
                                >
                                    {btn[1].text}
                                </button>);
                            })}
                    </div>
                ))}
            {!group[0] && <h5> {messageIfEmpty} </h5>}
        </section>
    );
}

// {
//     /*

//                         <button
//                             name={btn.action}
//                             onClick={(e) =>
//                                 clickHandler(
//                                     e.target.name,
//                                     person.other_user_id
//                                 )
//                             }
//                         >
//                             btn.buttonText
//                         </button>

//                         {buttons.cancel && (
//                             <button
//                                 name={buttons.cancel.action}
//                                 onClick={(e) =>
//                                     clickHandler(
//                                         e.target.name,
//                                         person.other_user_id
//                                     )
//                                 }
//                             >
//                                 Decline
//                             </button>
//                         )} */
// }
