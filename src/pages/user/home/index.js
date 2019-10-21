import React from 'react';
import SeoContainer from '&components/seo-container';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Footer from '&components/footer';
import FoodMenu from './food-menu';
import OrderForm from './order-form';

class Home extends React.Component {
    constructor(props) {
        super(props);
        const {match} = this.props;
        this.navItems = [
            {
                label: '菜谱',
                url: `${match.url}/food-menu`,
                icon: 'icon-foods'
            },
            {
                label: '订单',
                url: `${match.url}/order-form`,
                icon: 'icon-cargo'
            }
        ];
    }

    render() {
        const {match} = this.props;
        return (
            <SeoContainer title="颐嘉餐厅-首页">
                <Switch>
                    <Route path={`${match.url}/food-menu`} component={FoodMenu}/>
                    <Route path={`${match.url}/order-form`} component={OrderForm}/>
                    <Redirect from="/user/home" to={`${match.url}/food-menu`}/>
                </Switch>
                <Footer navItems={this.navItems}/>
            </SeoContainer>
        )
    }
}

export default withRouter(Home);