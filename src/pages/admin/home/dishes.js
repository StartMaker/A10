import React, {Fragment} from 'react';
import Search from '&components/input/btn-search';
import SeoContainer from '&components/seo-container';
import Dropdown from '&components/list-dropdown';
import {SwipeAction, Toast} from 'antd-mobile';
import {Link} from 'react-router-dom';
import Modal from '&components/modal';
import axios from '&helpers/config/axios';
import Icon from '&icons';

class Dishes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {
                dataSource: []
            },
            modal: {
                value: '',
                visible: false
            }
        };
    }
    componentDidMount() {
        axios.GET('/menu/base/all')
            .then(res => {
                if (res.code === 0) {
                    const {list} = this.state;
                    list.dataSource = res.data;
                    this.setState({list});
                }
                else {
                    alert(res.msg);
                }
            })
            .catch(err => {
                alert('网络异常');
            });
    }
    listMethods = {
        init: () => {
            const {list} = this.state;
            const {listMethods} = this;
            return list.dataSource.map((item, presentIndex) => {
                return (
                    <Dropdown
                        subTitle={item.sum}
                        title={item.menuBaseType}
                        key={item.id}>
                        {item.menuBaseVOList.map((item, nextindex)=> {
                            return (
                                <SwipeAction
                                    key={item.id}
                                    right={[
                                        {
                                            text: '编辑',
                                            style: {
                                                backgroundColor: 'rgb(199, 199, 203)',
                                                color: '#fff'
                                            },
                                            onPress: listMethods.edit(presentIndex, nextindex)
                                        },
                                        {
                                            text: '删除',
                                            style: {
                                                backgroundColor: 'rgb(234, 78, 61)',
                                                color: '#fff'
                                            },
                                            onPress: listMethods.del(presentIndex, nextindex)
                                        }
                                    ]}>
                                    <div className="card">
                                        <Icon type="icon-meat"/>
                                        {item.productName}
                                    </div>
                                </SwipeAction>
                            )
                        })}
                    </Dropdown>
                );
            });
        },
        del: (presentIndex, nextIndex) => () => {
            const {list} = this.state;
            const params = {
                id: list.dataSource[presentIndex].menuBaseVOList[nextIndex].id
            };
            axios.GET('/menu/deleteBase',params)
                .then(res => {
                    if (res.code === 0) {
                        list.dataSource[presentIndex].menuBaseVOList.splice(nextIndex,1);
                        list.dataSource[presentIndex].sum--;
                        Toast.success('删除成功',0.5);
                        this.setState({list});
                    }
                    else {
                        Toast.fail(res.msg, 0.5);
                    }
                })
                .catch(err => {
                    alert('网络异常');
                });
        },
        edit: (presentIndex, nextIndex) => () => {
            const {modal, list} = this.state;
            this.presentIndex = presentIndex;
            this.nextIndex = nextIndex;
            modal.value = list.dataSource[presentIndex].menuBaseVOList[nextIndex].productName;
            modal.visible = true;
            console.log(modal);
            this.setState({modal});
        },
        move: () => {}
    };
    modalMethods = {
        valueChange: (value) => {
            const {modal} = this.state;
            modal.value = value;
            this.setState({modal});
        },
        cancel: () => {
            const {modal} = this.state;
            modal.visible = false;
            modal.value = '';
            this.setState({modal});
        },
        submit: () => {
            const {list, modal} = this.state;
            const params = {
                id: list.dataSource[this.presentIndex].menuBaseVOList[this.nextIndex].id,
                productName: modal.value
            };
            axios.POST('/menu/base/update', params)
                .then(res => {
                    if (res.code === 0) {
                        list.dataSource[this.presentIndex].menuBaseVOList[this.nextIndex].productName = modal.value;
                        modal.value = '';
                        modal.visible = false;
                        Toast.success('修改成功',0.5);
                        this.setState({list, modal});
                    }
                    else {
                        Toast.fail(res.msg, 0.5);
                    }
                })
                .catch(err => {
                    alert('网络异常');
                });
        }
    };

    render() {
        const {listMethods, modalMethods} = this;
        const {modal} = this.state;
        return (
            <SeoContainer title="颐嘉餐厅-菜品管理">
                <nav className="nav">
                    <div className="container">
                        {/*<Search/>*/}
                        <Link to="/admin/create" className="create">
                            <span className="create-label">添加</span>
                            <Icon type="icon-right"/>
                        </Link>
                    </div>
                </nav>
                <div className="content">
                    {listMethods.init()}
                </div>
                <Modal
                    onChange={modalMethods.valueChange}
                    visible={modal.visible}
                    value={modal.value}
                    onSubmit={modalMethods.submit}
                    onCancel={modalMethods.cancel}
                    submitText="修改"
                    placeholder="输入新的菜品名称"
                    title="修改菜品名称"/>
            </SeoContainer>
        )
    }
}

export default Dishes;