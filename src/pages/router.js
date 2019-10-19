import React, {lazy} from 'react';
import {Route, Switch} from 'react-router-dom';
import {hot} from 'react-hot-loader';

const Login = lazy(() => import('./login'));
const AdminHome = lazy(() => import('./admin/home'));
const UserHome = lazy(() => import('./user/home'));
const AdminCreate = lazy(() => import('./admin/operate'));
const UserCreate = lazy(() => import('./user/operate'));

class Routers extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/admin/home" component={AdminHome}/>
                <Route path="/admin/create" component={AdminCreate}/>
                <Route path="/user/home" component={UserHome}/>
                <Route path="/user/operate" component={UserCreate}/>
            </Switch>
        )
    }
}

export default hot(module)(Routers);