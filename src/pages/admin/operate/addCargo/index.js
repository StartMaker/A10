import React, {Fragment} from 'react';
import { List, InputItem, SwipeAction, Toast } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import Button from '&components/button';
import Input from '&components/input/normal';
import Select from '&components/select';
import Icon from '&icons';
import './styles.less';
import axios from "../../../../helpers/config/axios";

class AddDishes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cargoList: [],
            categories: []
        };
    }
    listOperates = {
        del: (index) => () => {
            const {cargoList} = this.state;
            cargoList.splice(index, 1);
            this.setState({cargoList});
        },
        add: () =>{
            const {cargoList, categories} = this.state;
            if (categories.length === 0) {
                alert('请先添加原料种类');
                return;
            }
            const item = {
                pid: categories[0].id,
                productName: ''
            };
            cargoList.push(item);
            this.setState({cargoList});
        },
        edit: (key, index) => (value) => {
            const {cargoList} = this.state;
            console.log(cargoList);
            cargoList[index][key] = value;
            this.setState({cargoList});
        },
        submit: () => {
            const {cargoList} = this.state;
            const noTrim = cargoList.every(item => item.productName !== '');
            if (noTrim) {
                axios.POST('/replenish/greens/insert', cargoList)
                    .then(res => {
                        if (res.code === 0) {
                            this.setState({
                                cargoList: []
                            });
                        }
                        else {
                            alert(res.msg);
                        }
                    })
                    .catch(err => {
                        alert('网络异常');
                    });
            }
        }
    };
    backRoute = () => {
        const {history} = this.props;
        history.goBack();
    };
    componentDidMount() {
        axios.GET('/replenish/greens/type/all')
            .then(res => {
                if (res.code === 0) {
                    this.setState({categories: res.data});
                }
                else {
                    alert(res.msg);
                }
            })
            .catch(err => {
                alert('网络异常');
            });
    }

    render() {
        const {listOperates} = this;
        const {cargoList, categories} = this.state;
        const {closeDrawer} = this.props;
        const categoriesList = categories.map(item => (
            <option
                key={item.id}
                value={item.id}>
                {item.productName}
            </option>
        ));
        return (
            <Fragment>
                <h2 className="add-title">
                    添加货物种类
                    <a onClick={listOperates.add}>
                        <Icon type="icon-add"/>
                    </a>
                </h2>
                <form className="add-form">
                    <List>
                        {
                            cargoList.map((item, index) => {
                                return (
                                    <SwipeAction key={index} right={[
                                        {
                                            text: '删除',
                                            onPress: listOperates.del(index),
                                            style: {
                                                color: '#ffffff',
                                                backgroundColor: 'rgb(234,78,61)'
                                            }
                                        }
                                    ]}>
                                        <InputItem
                                            value={item.productName}
                                            type="text"
                                            placeholder="输入原料名称"
                                            onChange={listOperates.edit('productName', index)}>
                                            <Select
                                                placeholder="选择菜品分类"
                                                value={item.pid}
                                                onChange={listOperates.edit('pid', index)}>
                                                {[...categoriesList]}
                                            </Select>
                                        </InputItem>
                                    </SwipeAction>
                                );
                            })
                        }
                    </List>
                    <Button type="primary" onClick={listOperates.submit}>提交</Button>
                    <Button type="primary" onClick={closeDrawer}>取消</Button>
                </form>
            </Fragment>
        )
    }
}

export default withRouter(AddDishes);