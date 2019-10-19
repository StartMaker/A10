import React, {Fragment} from 'react';
import {List} from 'antd-mobile';
import Category from './category';
import Icon from '&icons';
import './styles.less';
import axios from '&helpers/config/axios';
import Modal from '&components/modal';

class AddDishesCategory extends React.Component {
    constructor(props) {
        super(props);
        this.item = null;
        this.state = {
            modal: {
                visible: false,
                value: ''
            },
            dataSource: []
        }
    }
    componentDidMount() {
        axios.GET('/menu/base/type/all')
            .then(res => {
                if (res.code === 0) {
                    this.setState({
                        dataSource: res.data
                    });
                }
                else {
                    alert(res.msg);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    listOperates = {
        edit: (index) => () => {
            console.log(index);

        },
        del: (index) => () => {
            console.log(index);
            const result = confirm('确认删除？ 删除后此种类下的菜品将移动到默认目录');
            if (result) {
                const {dataSource} = this.state;
                axios.GET('/menu/base/type/delete', {id: dataSource[index].id})
                    .then(res => {
                        if (res.code === 0) {
                            dataSource.splice(index,1);
                            this.setState({dataSource});
                        }
                        else {
                            alert(res.msg);
                        }
                    })
                    .catch(err => {
                        alert('删除失败');
                    })
            }
        },
        check: (index) => () => {
            console.log(index);
        },
        add: () => {

        }
    };
    modalOperates = {
        close: () => {
            const {modal} = this.state;
            modal.visible = false;
            modal.value = '';
            this.setState({modal});
        },
        open: () => {
            const {modal} = this.state;
            modal.visible = true;
            this.setState({modal});
        },
        valueChange: (value) => {
            const {modal} = this.state;
            modal.value = value;
            this.setState({modal});
        },
        submit: () => {
            const {dataSource, modal} = this.state;
            if(modal.value !== '') {
                axios.POST('/menu/base/type/insert', {menuBaseType: modal.value})
                    .then(res => {
                        if (res.code === 0) {
                            dataSource.push(res.data);
                            modal.visible = false;
                            modal.value = '';
                            this.setState({modal, dataSource});
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
    render() {
        const {modal, dataSource} = this.state;
        const {listOperates, modalOperates} = this;
        return (
            <Fragment>
                <h2 className="dishesCategory-title">
                    所有菜品分类
                    <a onClick={modalOperates.open}>
                        <Icon type="icon-add"/>
                    </a>
                </h2>
                <List className="dishesCategory-list">
                    {
                        dataSource.map((item, index) => {
                            return (
                                <Category
                                    key={item.id}
                                    onClick={listOperates.check(index)}
                                    onEdit={listOperates.edit(index)}
                                    onDelete={listOperates.del(index)}
                                    defaultValue={item.menuBaseType}
                                    id={item.id}
                                    sum={item.sum}/>
                            )
                        })
                    }
                </List>
                <Modal
                    submitText="添加"
                    title="添加菜品种类"
                    onChange={modalOperates.valueChange}
                    onSubmit={modalOperates.submit}
                    onCancel={modalOperates.close}
                    value={modal.value}
                    visible={modal.visible}
                    placeholder="输入新的分类名称"/>
            </Fragment>
        )
    }
}

export default AddDishesCategory;