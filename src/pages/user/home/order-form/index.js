import React, {Fragment} from 'react';
import Icon from '&icons';
import SeoContainer from '&components/seo-container';
import DayOrder from './day-order';
import {Drawer} from 'antd-mobile';
import Sider from './sider';
import './styles.less';

class FoodMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawer: {
                open: false
            }
        }
    }
    drawerMethods = {
        changeStatus: () => {
            const {drawer} = this.state;
            drawer.open = !drawer.open;
            this.setState({drawer});
        }
    };
    render() {
        const {drawer} = this.state;
        const {drawerMethods} = this;
        return (
            <SeoContainer title="颐嘉餐厅-订单">
                <nav className="nav-container">
                    <span className="nav-title">订单</span>
                    <Icon type="icon-add" onClick={drawerMethods.changeStatus}/>
                </nav>
                <main className="food-menu-content">
                    <Drawer
                        sidebar={<Sider changeStatus={drawerMethods.changeStatus}/>}
                        open={drawer.open}
                        position="right">
                        <DayOrder/>
                    </Drawer>
                </main>
            </SeoContainer>
        )
    }
}

export default FoodMenu;