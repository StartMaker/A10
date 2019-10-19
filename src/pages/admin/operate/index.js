import React, {Fragment} from 'react';
import './styles.less';
import Icon from '&icons';
import {Drawer, List} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import AddDishesCategory from './addDishesCategory';
import AddDishes from './addDishes';
import AddCargo from './addCargo';
const {Item} = List;
const {Brief} = Item;

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawer: {
                open: false,
                sidebar: 'initial'
            }
        };
        this.operateRoute= {
            initial: null,
            addDishes: (
                <AddDishes closeDrawer={this.closeDrawer}/>
            ),
            addCargo: (
                <AddCargo closeDrawer={this.closeDrawer}/>
            ),
            addDishesCategory: (
                <AddDishesCategory/>
            )
        };
    }
    backRoute = () => {
        const {history} = this.props;
        console.log(history);
        history.goBack();
    };
    createOperateTitle = (type) => {
        const titles = {
            addDishes: '菜品种类',
            addCargo: '货物种类',
            addDishesCategory: '菜品分类'
        };
        if (type === 'initial') {
            return null;
        }
        return (
            <Fragment>
                <span style={{marginLeft: 10, marginRight: 10}}>/</span>
                <span>{titles[type]}</span>
            </Fragment>
        )
    };
    closeDrawer = () => {
        this.setState({
            drawer: {
                open: false,
                sidebar: 'initial'
            }
        });
    };
    openDrawer = (pageType) => () => {
        this.setState({
            drawer: {
                open: true,
                sidebar: pageType
            }
        });
    };

    render() {
        const {drawer} = this.state;
        const {operateRoute, operate} = this;
        return (
            <div className="admin-create">
                <nav className="admin-create-nav">
                    <a onClick={this.backRoute}>
                        <Icon type="icon-left"/>
                        <span className="admin-create-nav-label">回到主页</span>
                    </a>
                </nav>
                <div className="operate-title">
                    <p className="operate-label">
                        <a style={{color: 'rgb(91,199,246)'}} onClick={this.closeDrawer}>添加</a>
                        {this.createOperateTitle(drawer.sidebar)}
                    </p>
                </div>

                <div className="operate-container">
                    <Drawer
                        sidebar={operateRoute[drawer.sidebar]}
                        position="right"
                        open={drawer.open}
                    >
                        <Item
                            className="operate-item"
                            arrow="horizontal"
                            onClick={this.openDrawer('addDishesCategory')}>
                            <Brief>菜品分类</Brief>
                        </Item>
                        <Item
                            className="operate-item"
                            arrow="horizontal"
                            onClick={this.openDrawer('addDishes')}>
                            <Brief>菜品种类</Brief>
                        </Item>
                        <Item
                            className="operate-item"
                            arrow="horizontal"
                            onClick={this.openDrawer('addCargo')}>
                            <Brief>进货种类</Brief>
                        </Item>
                    </Drawer>
                </div>
            </div>
        )
    }
}

export default withRouter(Create);