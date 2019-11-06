import React, {Fragment} from 'react';
import Icon from '&icons';
import {Toast} from "antd-mobile";
import axios from '&helpers/config/axios';

class DayMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actives: [false],
            dataSource: []
        };
    };
    loadMore = (index) => () => {
        const {actives} = this.state;
        actives[index] = !actives[index];
        this.setState({actives});
    };
    componentDidMount() {
        axios.GET('/menu/getallmenu',this.page)
            .then(res => {
                if (res.code === 0) {
                    console.log(res);
                    this.setState({
                        dataSource: res.data.list
                    })
                }
                else {
                    Toast.fail(res.msg,1);
                }
            })
            .catch(err => {
                Toast.fail('网络异常',1);
            });
    };
    listMethods = {
        deleteMenu: (id) => () => {
            const sure = confirm('sure to delete ?');
            if (sure) {
                axios.GET('',{id: 1})
                    .then(res => {

                    })
                    .catch(err => {

                    });
            }
        },
        init: () => {
            const {dataSource, actives} = this.state;
            return dataSource.map((item, index) => {
                return (
                    <Fragment>
                        <div className="food-menu-title">
                            <Icon type="icon-lunch"/>
                            <span className="food-menu-title-label">午餐菜谱</span>
                        </div>
                        <div className={actives[0] ? 'food-menu-dropdown' : 'food-menu-dropdown food-menu-close'}>
                            牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，
                            牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，
                            牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，
                        </div>
                        <div className="food-menu-btn-group">
                            <a
                                tabIndex="0"
                               className="food-menu-more"
                                onClick={this.listMethods.deleteMenu('id')}>
                                删除
                            </a>
                            <a
                                tabIndex="1"
                                className="food-menu-more"
                                onClick={this.loadMore(0)}>
                                {
                                    actives[0] ? '收起' : '加载更多...'
                                }
                            </a>
                        </div>
                    </Fragment>
                );
            });
        },
        early: () => {
            if (this.page.pageNum === 1) {
                Toast.fail('已到第一页');
                return ;
            }
            this.page.pageNum --;
            axios.GET('/menu/getallmenu',this.page)
                .then(res => {
                    if (res.code === 0) {
                        console.log(res);
                        this.setState({
                            dataSource: res.data.list
                        })
                    }
                    else {
                        Toast.fail(res.msg,1);
                    }
                })
                .catch(err => {
                    Toast.fail('网络异常',1);
                });
        },
        late: () => {
            this.page.pageNum ++;
            axios.GET('/menu/getallmenu',this.page)
                .then(res => {
                    if (res.code === 0) {
                        console.log(res);
                        if (res.data.list.length === 0) {
                            Toast.fail('已到最后一页');
                            this.page.pageNum --;
                        }
                        else {
                            this.setState({
                                dataSource: res.data.list
                            })
                        }
                    }
                    else {
                        Toast.fail(res.msg,1);
                    }
                })
                .catch(err => {
                    Toast.fail('网络异常',1);
                });
        }
    };
    render() {
        const {actives} = this.state;
        const {listMethods} = this;
        return (
            <div className="food-menu-item">
                <div className="food-menu-time">2019-8-8</div>
                <Fragment>
                    <div className="food-menu-title">
                        <Icon type="icon-lunch"/>
                        <span className="food-menu-title-label">午餐菜谱</span>
                    </div>
                    <div className={actives[0] ? 'food-menu-dropdown' : 'food-menu-dropdown food-menu-close'}>
                        牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，
                        牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，
                        牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，
                    </div>
                    <div className="food-menu-btn-group">
                        <a tabIndex="0" className="food-menu-more">删除</a>
                        <a
                            tabIndex="1"
                            className="food-menu-more"
                            onClick={this.loadMore(0)}>
                            {
                                actives[0] ? '收起' : '加载更多...'
                            }
                        </a>
                    </div>
                </Fragment>
                <div className="day-menu-btn-group">
                    <a className="btn" onClick={listMethods.early}>上一页</a>
                    <a className="btn" onClick={listMethods.late}>下一页</a>
                </div>
            </div>
        )
    }
}

export default DayMenu;