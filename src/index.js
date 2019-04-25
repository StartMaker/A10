import React from 'react';
import {render} from 'react-dom';
import {Provider as ReduxProvide} from 'react-redux';

import Root from './root';
import './App/static/css/default.less';
import storeConfig from './storeConfig';

const store = storeConfig();

class App extends React.Component{
    componentWillMount(){
        let root = document.getElementById('root');
        console.log(root._reactRootContainer);
    }
    render() {
        return (
            <ReduxProvide store={store}>
                <Root/>
            </ReduxProvide>
        );
    }
}

render(
    <App/>,
    document.getElementById('root')
);

export default App;