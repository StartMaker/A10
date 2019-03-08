import React from 'react';
import {render} from 'react-dom';
import {Provider as ReduxProvide} from 'react-redux';

import Root from './root';
import './App/static/css/default.less';
import storeConfig from './storeConfig';

const store = storeConfig();

class App extends React.Component{
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
    document.body
);

export default App;