import React, {Fragment} from 'react';
import Input from '&components/input/normal';
import Icon from '&icons';
import {Toast} from 'antd-mobile';
import axios from '&helpers/config/axios';

class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.dtos = {};
        this.state = {
            form: {
                category: '0'
            },
        };
    }
    formMethods = {
        valueChange: (index, key) => (value) => {
            this.dtos[index][key] = value;
        },
        cancel: () => {
            const {changeStatus} = this.props;
            this.dtos = {};
            changeStatus();
        },
        submit: () => {
            console.log(this.dtos);
            const dtos  = [];
            for (let key in this.dtos) {
                dtos.push(this.dtos[key]);
            }
            axios.POST('/replenish/insert',{dtos})
                .then(res => {
                    console.log('ss');
                    if (res.code === 0) {
                        this.formMethods.cancel();
                    }
                    else {
                        Toast.fail(res.msg);
                    }
                })
                .catch(err => {
                    alert('网络异常');
                });
        },
        init: () => {
            const {dataSource} = this.props;
            const list = [];
            const {dtos} = this;
            this.dtos = {};
            for (let key in dataSource) {
                list.push(dataSource[key]);
                if (dtos[key]) {
                    this.dtos[key] = dtos[key];
                }
                else {
                    this.dtos[key] = {
                        contact: '',
                        address: '',
                        greensNum: '',
                        phoneNum: '',
                        unitPrice: '',
                    };
                }
            }
            return list.map(item => {
                return (
                    <form key={item.id} className="order-form">
                        <div className="order-form-title">
                            <Icon type="icon-meat"/>
                            {item.productName}
                        </div>
                        <div className="order-form-item">
                            <span className="order-form-label">联系人</span>
                            <Input
                                onChange={this.formMethods.valueChange(item.id, 'contact')}
                                className="order-form-input"
                                type="text"
                                placeholder="请输入联系人姓名"/>
                        </div>
                        <div className="order-form-item">
                            <span className="order-form-label">地址</span>
                            <Input
                                onChange={this.formMethods.valueChange(item.id, 'address')}
                                className="order-form-input"
                                type="text"
                                placeholder="请输入地址"/>
                        </div>
                        <div className="order-form-item">
                            <span className="order-form-label">数量</span>
                            <Input
                                onChange={this.formMethods.valueChange(item.id, 'greensNum')}
                                className="order-form-input"
                                type="number"
                                placeholder="请输入数量"/>
                        </div>
                        <div className="order-form-item">
                            <span className="order-form-label">电话</span>
                            <Input
                                onChange={this.formMethods.valueChange(item.id, 'phoneNum')}
                                className="order-form-input"
                                type="text"
                                placeholder="请输入电话"/>
                        </div>
                        <div className="order-form-item">
                            <span className="order-form-label">单价</span>
                            <Input
                                onChange={this.formMethods.valueChange(item.id, 'unitPrice')}
                                className="order-form-input"
                                type="number"
                                placeholder="请输入单价"/>
                        </div>
                    </form>
                )
            });
        }
    };

    render() {
        const {formMethods} = this;
        const {changeStatus} = this.props;
        return (
            <Fragment>
                <div className="sider-middle">
                    <div className="sider-middle-title">创建订单</div>
                    {formMethods.init()}
                </div>
                <div className="btn-group">
                    <a className="submit" onClick={formMethods.submit}>提交</a>
                    <a className="cancel" onClick={formMethods.cancel}>取消</a>
                </div>
            </Fragment>
        )
    }
}

export default Sider;