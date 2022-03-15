import { useEffect } from "react";

// useEffect --> means useSideEffect. can also be thought of as useR Side effect xD 
//           --> in the sense that it tracks and acts on the effects of user interaction // ok maybe i got it wrong

// kind of a replacer to the mounted() fn on class components

// only use one useEffect for logical unit
// but now we're not organizing by lifecycle moment anymore (mount,update usw), but by functionality

// useEffect( //effect: () => {}, //deps:[sth]);  // meaning: do {effect} every time that {deps} update    
                                                 // effect: the fn that'll run -- a request, whatever
                                                 // deps (dependencies): the value you're keeping track of and wantto act on



export function Hooks() {
    const [searchTerm, setSearchTerm]  = useState();
}

useEffect(() => {}, []);

// RETURN --> you can return a function in your useEffect, that is known as a clean-up fn
// there you can define some stuff that might prevent for example in a search thing that you get responses for reqs that are not the most up-to-date one
// eg. you type ALB and would otherwise get the resps for A, AL first
// kinda equivalent to the method compUnmount() (or sth like that) in clComp

useEffect(
    let abort=false;
    ft
);

return () => {abort=true};
// ---> return (whatever useEffect returns) => {value to return}
// it's declared in the scope of your useEffect fn (the fa in the useEffect(()=>{*here}, []) args)
// so it'll only be valid for that one run of your sideEffect, no effect on any next runs