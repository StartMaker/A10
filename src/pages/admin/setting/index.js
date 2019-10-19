import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import SeoContainer from '&components/seo-container';
import UserList from './user-list';
import Root from './root';

class Setting extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {match} = this.props;
        return (
            <SeoContainer title="颐嘉餐厅-设置">
                <Switch>
                    <Route path={`${match.url}/root`} component={Root}/>
                    <Route path={`${match.url}/user-list`} component={UserList}/>
                    <Redirect from={match.url} to={`${match.url}/root`}/>
                </Switch>
            </SeoContainer>
        )
    }
}

export default Setting;