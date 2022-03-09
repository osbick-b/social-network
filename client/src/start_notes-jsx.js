import ReactDOM from "react-dom";

ReactDOM.render(<HelloWorld />, document.querySelector("main"));  // this will render the component created below in the document

// tags that are not html ---> are components
// a react component's job is providing sth to show (or use etc.., some things are invisible)
// \__> create a user interface that you can see


// ======== Class Components ======== //
// you can also use a class instead of functions (now you don't really need them anymore, but we'll learn it for now)

function Div (){...}    //   ---> <Div/>


// ======== A Demo Component ====== //

// this is a component:
function HelloWorld() {
    // return React.createElement("div" /* ... */) // --> this would be the alternative
    return <div>Hello, World!</div>; // return an object that represents a div --> this is JSX
}
// always name your React components with a capital letter !!!

// ----> it looks like html, but is actually JS. that is JSX


// ======= Conflicts ====== //

// there are some conflicts, such as "class", that is a JS keyword, but also a html prop.
// so you'd use <div className="funky"></div> in JSX



function Greetee(props) {
    return (    // ---------------------> useful thing to do: return with brackets, so you can break line and visualize the HTML better. 
                                        // bc return is one of the few places where line breaks do matter a lot
        <div className="funky">
            <Gretee name={props.greetee}/>
        </div>
    );
}

///// IN JSX:
// {} --- used to switch into JS evaluation mode --- <Gretee name={props.greetee}/>
          // always single brackets -- you can however see {{ color: tomato}}, where the inner {} just represent an obj within the normal eval {}


// ==== Conditionals ==== //
// you cant use IF inside the curly brackets --> so you'll need to do it using && or || or ternary or sth






