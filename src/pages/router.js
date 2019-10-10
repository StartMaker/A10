import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './login';
import AdminHome from './admin/home';
import {hot} from 'react-hot-loader';

class Routers extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route path="/admin/home" component={AdminHome}/>
            </Switch>
        )
    }
}

export default hot(module)(Routers);