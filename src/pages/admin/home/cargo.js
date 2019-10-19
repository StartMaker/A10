import React, {Fragment} from 'react';
import Search from '&components/input/btn-search';
import {SwipeAction, Toast} from 'antd-mobile';
import {Link} from 'react-router-dom';
import Dropdown from '&components/list-dropdown';
import axios from '&helpers/config/axios';
import Modal from '&components/modal';
import Icon from '&icons';
import SeoContainer from '&components/seo-container';


class Cargo extends React.Component {
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
        axios.GET('/replenish/greens')
            .then(res => {
                if (res.code === 0) {
                    this.setState({
                        list: {
                            dataSource: res.data
                        }
                    });
                }
                else {
                    Toast.fail(res.msg, 0.5);
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
                        title={item.productName}
                        key={item.id}>
                        {item.baseList.map((item, nextIndex)=> {
                            return (
                                <SwipeAction
                                    subTitle={item.sum}
                                    key={item.id}
                                    right={[
                                        {
                                            text: '编辑',
                                            style: {
                                                backgroundColor: 'rgb(199, 199, 203)',
                                                color: '#fff'
                                            },
                                            onPress: listMethods.edit(presentIndex, nextIndex)
                                        },
                                        {
                                            text: '删除',
                                            style: {
                                                backgroundColor: 'rgb(234, 78, 61)',
                                                color: '#fff'
                                            },
                                            onPress: listMethods.del(presentIndex, nextIndex)
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
        edit: (presentIndex, nextIndex) => () => {
            const {modal, list} = this.state;
            this.presentIndex = presentIndex;
            this.nextIndex = nextIndex;
            modal.visible = true;
            modal.value = list.dataSource[presentIndex].baseList[nextIndex].productName;
            this.setState({modal});
        },
        del: (presentIndex, nextIndex) => () => {
            const {list} = this.state;
            const params = {
                id: list.dataSource[presentIndex].baseList[nextIndex].id
            };
            axios.GET('/replenish/greens/delete', params)
                .then(res => {
                    if (res.code === 0) {
                        list.dataSource[presentIndex].baseList.splice(nextIndex, 1);
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

        }
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
                id: list.dataSource[this.presentIndex].baseList[this.nextIndex].id,
                productName: modal.value,
                pid: list.dataSource[this.presentIndex].id
            };
            axios.POST('/replenish/greens/update', params)
                .then(res => {
                    if (res.code === 0) {
                        list.dataSource[this.presentIndex].baseList[this.nextIndex].productName = modal.value;
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
            <SeoContainer title="颐嘉餐厅-进货管理">
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
                    placeholder="输入新的货物名称"
                    title="修改货物名称"/>
            </SeoContainer>
        )
    }
}

export default Cargo;