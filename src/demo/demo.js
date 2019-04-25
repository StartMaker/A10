import React from 'react';

import {Provider} from './context';
import Main from './main';

class App extends React.Component{
    constructor(props,context){
        super(props,context);
    }
    componentDidMount() {
        console.log(this);
    }
    render(){
        return (
            <Provider value='我是猪啊'>
                <Main/>
            </Provider>
        )
    }
}

export default App;