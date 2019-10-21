import React, {Fragment} from 'react';
import Icon from '&icons';
import SeoContainer from '&components/seo-container';
import DayOrder from './day-order';
import {Drawer, Toast} from 'antd-mobile';
import Sider from './sider';
import axios from '&helpers/config/axios';
import './styles.less';

class FoodMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawer: {
                open: false
            },
            menu: {
                visible: false,
                current: {},
                currentIndex: 0,
                dataSource: []
            }
        }
    }
    componentDidMount() {
        axios.GET('/replenish/greens')
            .then(res => {
                console.log(res);
                if (res.code === 0) {
                    const {menu} = this.state;
                    menu.dataSource = res.data;
                    this.setState({menu});
                }
                else {
                    Toast.fail(res.msg, 1);
                }
            })
            .catch(err => {
                alert('网络异常');
            });
    }
    drawerMethods = {
        changeStatus: () => {
            const {drawer} = this.state;
            drawer.open = !drawer.open;
            this.setState({drawer});
        }
    };
    menuMethods = {
        init: () => {
            const {menu} = this.state;
            return menu.dataSource.map((item, index) => {
                return (
                    <div
                        key={item.id}
                        className={
                            menu.currentIndex === index
                                ? 'menu-list-item menu-list-item-active'
                                : 'menu-list-item'
                        }
                        onClick={this.menuMethods.search(index)}>
                        {item.productName}
                    </div>
                );
            });
        },
        choose: (id, index) => () => {
            const {menu} = this.state;
            menu.current[id]
                ? delete menu.current[id]
                : menu.current[id] = menu.dataSource[menu.currentIndex].baseList[index];
            this.setState({menu});
        },
        search: (index) => () => {
            const {menu} = this.state;
            menu.currentIndex = index;
            this.setState({menu});
        },
        searchResult: () => {
            const {menu} = this.state;
            if (menu.dataSource[menu.currentIndex]) {
                return menu.dataSource[menu.currentIndex].baseList.map((item, index) => {
                    return (
                        <div
                            onClick={this.menuMethods.choose(item.id, index)}
                            key={item.id}
                            className={
                                menu.current[item.id]
                                ? 'menu-list-item-choose menu-list-item'
                                : 'menu-list-item'}>
                            {item.productName}
                            {
                                menu.current[item.id] && (
                                    <Icon type="icon-choose"/>
                                )
                            }
                        </div>
                    )
                });
            }
            else {
                return null;
            }
        },
        open: () => {
            const {menu} = this.state;
            menu.visible = !menu.visible;
            this.setState({menu});
        }
    };

    render() {
        const {drawer, menu} = this.state;
        const {drawerMethods, menuMethods} = this;
        return (
            <SeoContainer title="颐嘉餐厅-订单">
                <nav className="nav-container">
                    {
                        drawer.open && (
                            <Icon
                                className="nav-left"
                                type="icon-order-menu"
                                onClick={menuMethods.open}/>
                        )
                    }
                    <span className="nav-title">订单</span>
                    {
                        !drawer.open && (
                            <Icon
                                className="nav-right"
                                type="icon-add"
                                onClick={drawerMethods.changeStatus}/>
                        )
                    }
                </nav>
                <main className="order-menu-content">
                    <Drawer
                        sidebar={<Sider dataSource={menu.current} changeStatus={drawerMethods.changeStatus}/>}
                        open={drawer.open}
                        position="right">
                        <DayOrder/>
                    </Drawer>
                </main>
                <div className={menu.visible ? 'menu-list-wrapper' : 'menu-list-undisplay'}>
                    <div className="menu-list">
                        <div className="menu-list-left">
                            {menuMethods.init()}
                        </div>
                        <div className="menu-list-right">
                            {menuMethods.searchResult()}
                        </div>
                    </div>
                </div>
            </SeoContainer>
        )
    }
}

export default FoodMenu;