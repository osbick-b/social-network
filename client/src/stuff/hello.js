import React from 'react';
// in here you'd need to import Greetee from "./greetee" ---> and obv export it on the source

// ========= Creating Components with Classes ======== //

// need to export it so it can be used in another file

export default class HelloWorld extends React.Component {
    constructor (props) {
        super(props); // will make props into --> this.props

        // #2 you have to set the app state: *see notes
        this.setState({
            gretee: val
        })
        

    }
    handleChange(val){
        ///
    }
    render() {
        return <div className="funky">Hello, {this.state.greetee}</div>;
    }
}



// ===== Handle Events ===== //
// in react theres no v-model, so you need to handle stuff manually

<input
    defaultValue={this.state.greetee}
    // onChange={() => this.handleChange()} //pre-step for visualiz.
    onChange={({target}) => this.handleChange(target)}
/>;


// ==== State ==== //

// like in vue data() --> but react doesnt have data(), so you need to create state

// setState is async --> so it sets the state in the future. if you cl the app state in #2
