import React from 'react';
import {Consumer} from "./context";

class App extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount() {
        console.log(this);
    }

    render(){
        return (
            <Consumer>
                {(value) => value}
            </Consumer>
        )
    }
}

export default App;