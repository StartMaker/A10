import React from 'react';
import SeoContainer from '&components/seo-container';
import Footer from '&components/footer';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Cargo from './cargo';
import Dishes from './dishes';
import Setting from '../setting';
import './styles.less';

class Home extends React.Component {
    constructor(props) {
        super(props);
        const {match} = this.props;
        this.navItems = [
            {
                label: '菜品',
                url: `${match.url}/dishes`,
                icon: 'icon-food'
            },
            {
                label: '进货',
                url: `${match.url}/cargo`,
                icon: 'icon-cargo'
            },
            {
                label: '设置',
                url: `${match.url}/setting/root`,
                icon: 'icon-setting'
            }
        ];
    }

    render() {
        const {match} = this.props;
        return (
            <SeoContainer title="颐嘉餐厅-首页">
                <Switch>
                    <Route exact path={`${match.url}/dishes`} component={Dishes}/>
                    <Route path={`${match.url}/cargo`} component={Cargo}/>
                    <Route path={`${match.url}/setting`} component={Setting}/>
                    <Redirect from="/admin/home" to={`${match.url}/dishes`}/>
                </Switch>
                <Footer navItems={this.navItems}/>
            </SeoContainer>
        )
    }
}

export default withRouter(Home);