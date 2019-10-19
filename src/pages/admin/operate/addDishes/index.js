import React, {Fragment} from 'react';
import { List, InputItem, SwipeAction, Toast } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import Button from '&components/button';
import Select from '&components/select';
import Icon from '&icons';
import axios from '&helpers/config/axios';
import './styles.less';

class AddDishes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dishesList: [],
            categories: []
        };
    }
    componentDidMount() {
        axios.GET('/menu/base/type/all')
            .then(res => {
                if (res.code === 0) {
                    this.setState({
                        categories: res.data
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
    listOperates = {
        submit: () => {
            const {dishesList} = this.state;
            const noTrim = dishesList.every(item => item.productName !== '');
            if (noTrim) {
                axios.POST('/menu/base/insert', dishesList)
                    .then(res => {
                        console.log(res);
                        if (res.code === 0) {
                            Toast.success('添加成功',1);
                            this.setState({dishesList: []});
                        }
                        else {
                            alert(res.msg);
                        }
                    })
                    .catch(err => {
                        alert('网络异常');
                    });
            }
        },
        del: (index) => () => {
            const {dishesList} = this.state;
            dishesList.splice(index, 1);
            this.setState({dishesList});
        },
        add: () =>{
            const {dishesList, categories} = this.state;
            if (categories.length === 0) {
                alert('请先添加菜品种类');
                return ;
            }
            const item = {
                baseTypeId: categories[0].id,
                productName: ''
            };
            dishesList.push(item);
            this.setState({dishesList});
        },
        edit: (key, index) => (value) => {
            const {dishesList} = this.state;
            dishesList[index][key] = value;
            this.setState({dishesList});
        }
    };
    backRoute = () => {
        const {history} = this.props;
        history.goBack();
    };

    render() {
        const {listOperates} = this;
        const {dishesList, categories} = this.state;
        const {closeDrawer} = this.props;
        const categoriesList = categories.map(item => (
            <option
                key={item.id}
                value={item.id}>
                {item.menuBaseType}
            </option>
        ));
        return (
            <Fragment>
                <h2 className="add-title">
                    添加菜品种类
                    <a onClick={listOperates.add}>
                        <Icon type="icon-add"/>
                    </a>
                </h2>
                <form className="add-form">
                    <List>
                        {
                            dishesList.map((item, index) => {
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
                                            placeholder="输入菜品名称"
                                            onChange={listOperates.edit('productName',index)}>
                                            <Select
                                                placeholder="选择菜品分类"
                                                value={item.baseTypeId}
                                                onChange={listOperates.edit('baseTypeId', index)}>
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