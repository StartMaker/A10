import React, {Fragment} from 'react';
import {Toast} from 'antd-mobile';
import axios from '&helpers/config/axios';
import moment from 'moment';

class DayOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            current: 0
        };
    };
    componentDidMount() {
        const endDate = moment().valueOf();
        const date = moment.duration(15, 'days').valueOf();
        axios.GET('/replenish/getList', {date, endDate})
            .then(res => {
                if (res.code === 0) {
                    this.setState({dataSource: res.data});
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
            let {current} = this.state;
            const endDate = current === 0
                ? moment().valueOf()
                : moment.duration(current + 15, 'days').valueOf();
            const date = moment.duration(current + 30, 'days').valueOf();
            axios.GET('/replenish/getList',{date, endDate})
                .then(res => {
                    if (res.code === 0) {
                        if (res.data.length === 0) {
                            Toast.fail('已到第一页');
                        }
                        else {
                            this.setState({
                                current: current + 15,
                                dataSource: res.data
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
            let {current} = this.state;
            if (current - 15 < 0) {
                Toast.fail('已到最后一页',1);
                return ;
            }
            const endDate = current === 0
                ? moment().valueOf()
                : moment.duration(current - 15, 'days').valueOf();
            const date = moment.duration(current, 'days').valueOf();
            axios.GET('/replenish/getList',{date, endDate})
                .then(res => {
                    if (res.code === 0) {
                        if (res.data.length === 0) {
                            Toast.fail('已到最后一页');
                        }
                        else {
                            this.setState({
                                current: current - 15,
                                dataSource: res.data
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