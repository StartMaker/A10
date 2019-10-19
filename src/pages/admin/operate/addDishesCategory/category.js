import React from 'react';
import {List, SwipeAction} from 'antd-mobile';
import Modal from '&components/modal';
import axios from '&helpers/config/axios';
const {Item} = List;

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue,
            modal: {
                visible: false,
                value: this.props.defaultValue
            }
        };
    }
    modalOperates = {
        open: () => {
            const {modal} = this.state;
            modal.visible = true;
            this.setState({modal});
        },
        close: () => {
            const {modal, value} = this.state;
            modal.visible = false;
            modal.value = value;
            this.setState({modal});
        },
        valueChange: (value) => {
            const {modal} = this.state;
            modal.value = value;
            this.setState({modal});
        },
        submit: () => {
            const {id} = this.props;
            const {modal} = this.state;
            axios.POST('/menu/base/type/update',{id, menuBaseType: modal.value})
                .then(res => {
                    if (res.code === 0) {
                        modal.visible = false;
                        this.setState({modal, value: modal.value});
                    }
                    else {
                        alert(res.msg);
                    }
                })
                .catch(err => {
                    alert('修改失败，网络异常');
                });
        }
    };
    render() {
        const {sum, onEdit, onDelete, onClick} = this.props;
        const {modalOperates} = this;
        const {modal, value} = this.state;
        return (
            <SwipeAction
                className="dishesCategory-item"
                right={[
                    {
                        text: '编辑',
                        style: {
                            color: '#ffffff',
                            backgroundColor: 'rgb(199,199,203)'
                        },
                        onPress: modalOperates.open
                    },
                    {
                        text: '删除',
                        style: {
                            color: '#ffffff',
                            backgroundColor: 'rgb(234,78,61)'
                        },
                        onPress: onDelete
                    },
                ]}
            >
                <Item
                    className="dishesCategory-item-content"
                    onClick={onClick}
                >
                    {value}
                    <span className="dishesCategory-createTime">数量：{sum}</span>
                </Item>
                <Modal
                    submitText="修改"
                    title="编辑菜品种类"
                    onChange={modalOperates.valueChange}
                    onSubmit={modalOperates.submit}
                    onCancel={modalOperates.close}
                    value={modal.value}
                    visible={modal.visible}
                    placeholder="输入新的分类名称"/>
            </SwipeAction>
        )
    }
}

export default Category;