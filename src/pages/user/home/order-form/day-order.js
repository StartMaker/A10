import React, {Fragment} from 'react';
import {Toast} from 'antd-mobile';
import axios from '&helpers/config/axios';
import moment from 'moment';

class DayOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
        this.page = {
            pageNum: 1,
            pageSize: 15
        };
    };
    componentDidMount() {
        const {page} = this;
        axios.GET('/replenish/getorders', page)
            .then(res => {
                if (res.code === 0) {
                    this.setState({dataSource: res.data.list});
                }
                else {
                    Toast.fail(res.msg,1);
                }
            })
            .catch(err => {
                Toast.fail('网络异常',1);
            });
    }
    listMethods = {
        init: () => {
            const {dataSource} = this.state;
            return dataSource.map(item => {
                return (
                    <div key={item.preorderId} className="order-list-item">
                        <h4 className="order-list-title">{item.creatTime}</h4>
                        <div className="order-list-content">
                            <div>联系人：{item.contact}</div>
                            <div>地址：{item.address}</div>
                            <div>电话：{item.phoneNum}</div>
                            <div>订单总价：{item.totalPrice}</div>
                        </div>
                    </div>
                );
            });
        },
        early: () => {
            if (this.page.pageNum === 1) {
                Toast.fail('已到第一页');
                return ;
            }
            this.page.pageNum --;
            axios.GET('/replenish/getorders',this.page)
                .then(res => {
                    if (res.code === 0) {
                        if (res.data.length === 0) {
                            Toast.fail('已到第一页');
                        }
                        else {
                            this.setState({
                                dataSource: res.data.list
                            });
                        }
                    }
                    else {
                        Toast.fail(res.msg,1);
                    }
                })
                .catch(err => {
                    Toast.fail('网络异常');
                })
        },
        late: () => {
            this.page.pageNum ++;
            axios.GET('/replenish/getorders', this.page)
                .then(res => {
                    if (res.code === 0) {
                        if (res.data.list.length === 0) {
                            Toast.fail('已到最后一页');
                            this.page.pageNum --;
                        }
                        else {
                            this.setState({
                                dataSource: res.data.list
                            });
                        }
                    }
                    else {
                        Toast.fail(res.msg,1);
                    }
                })
                .catch(err => {
                    Toast.fail('网络异常');
                })
        }
    };

    render() {
        const {actives} = this.state;
        const {listMethods} = this;
        return (
            <Fragment>
                {listMethods.init()}
                <div className="order-form-btn-group">
                    <a className="btn" onClick={listMethods.early}>上一页</a>
                    <a className="btn" onClick={listMethods.late}>下一页</a>
                </div>
            </Fragment>
        )
    }
}

export default DayOrder;