import React from 'react';
import {withRouter} from 'react-router-dom';
import Icon from '&icons';
import {SwipeAction, Toast} from 'antd-mobile';
import SeoContainer from '&components/seo-container';
import axios from '&helpers/config/axios';
import Modal from '&components/modal';
import './styles.less';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            modal: {
                value: '',
                visible: false
            }
        };
        this.modal = {
            action: '',
            currentIndex: 0
        };
    }
    backRoute = () => {
        const {history} = this.props;
        history.goBack();
    };
    componentDidMount() {
        axios.GET('/admin/list')
            .then(res => {
                if (res.code === 0) {
                    this.setState({
                        dataSource: res.data
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
            const {dataSource} = this.state;
            const {listMethods} = this;
            return dataSource.map((item, index) => {
                return (
                    <div key={item.id} className="user-list-items">
                        <SwipeAction right={[
                            {
                                text: '编辑',
                                style: {
                                    color: '#fff',
                                    backgroundColor: 'rgb(234, 78, 61)',
                                    paddingLeft: 9,
                                    paddingRight: 9,
                                },
                                onPress: listMethods.edit(index)
                            },
                            {
                                text: '重置',
                                style: {
                                    color: '#fff',
                                    backgroundColor: 'pink',
                                    paddingLeft: 9,
                                    paddingRight: 9,
                                },
                                onPress: listMethods.reset(index)
                            },
                            {
                                text: '删除',
                                style: {
                                    color: '#fff',
                                    backgroundColor: 'rgb(199, 199, 203)',
                                    paddingLeft: 9,
                                    paddingRight: 9,
                                },
                                onPress: listMethods.del(index)
                            }
                        ]}>
                            <div className="user-card">
                                <Icon type="icon-user"/>
                                <span className="user-card-label">{item.username}</span>
                            </div>
                        </SwipeAction>
                    </div>
                )
            })
        },
        edit: (index) => () => {
            const {modal, dataSource} = this.state;
            this.modal = {
                currentIndex: index,
                action: 'edit'
            };
            modal.visible = true;
            modal.value = dataSource[index].username;
            this.setState({modal});
        },
        del: (index) => () => {
            const {dataSource} = this.state;
            const secondSure = confirm(`确认删除用户: ${dataSource[index].username} ?`);
            if (secondSure) {
                axios.GET('/admin/delete',{id: dataSource[index].id})
                    .then(res => {
                        if (res.code === 0) {
                            dataSource.splice(index,1);
                            this.setState({dataSource});
                            Toast.success('删除成功',0.5);
                        }
                        else {
                            Toast.fail(res.msg, 0.5);
                        }
                    })
                    .catch(err => {
                        alert('网络异常');
                    })
            }
        },
        reset: (index) => () => {
            const {dataSource} = this.state;
            const secondSure = confirm(`是否重置用户 ${dataSource[index].username} 的密码为123456`);
            if (secondSure) {
                axios.POST('/admin/resetpw', {id: dataSource[index].id})
                    .then(res => {
                        if (res.code === 0) {
                            Toast.success('重置成功');
                        }
                        else {
                            Toast.fail(res.msg);
                        }
                    })
                    .catch(err => {
                        alert('网络异常');
                    });
            }
        },
        add: () => {
            const {modal} = this.state;
            modal.visible = true;
            this.modal.action = 'add';
            this.setState({modal});
        }
    };
    modalMethods = {
        valueChange: (value) => {
            const {modal} = this.state;
            modal.value  = value;
            this.setState({modal});
        },
        submit: () => {
            const {modal, dataSource} = this.state;
            if (modal.value === '') {
                Toast.info('输入不能为空',0.5);
                return;
            }
            let request = this.modal.action === 'add'
                ? axios.POST('/admin/insert', {username: modal.value})
                : axios.POST('/admin/updateusername', {
                    id: dataSource[this.modal.currentIndex].id,
                    username: modal.value
                });
            request.then(res => {
                if (res.code === 0) {
                    Toast.success(res.msg, 0.5);
                    this.modal.action === 'add' && dataSource.push(res.data);
                    this.modal.action === 'add' && Toast.success('添加成功，初始密码为123456',1.5);
                    this.modal.action === 'edit' && Toast.success(res.msg, 0.5);
                    this.modal.action === 'edit' && (dataSource[this.modal.currentIndex].username = modal.value);
                    modal.value = '';
                    modal.visible =false;
                    this.setState({modal, dataSource});
                }
                else {
                    alert(res.msg);
                }
            })
                .catch(err => {
                    alert('网络异常');
                });
        },
        cancel: () => {
            const {modal} = this.state;
            modal.visible = false;
            modal.value =  '';
            this.setState({modal});
        }
    };

    render() {
        const {listMethods, modalMethods} = this;
        const {modal} = this.state;
        return (
            <SeoContainer title="颐嘉餐厅-编辑用户列表">
                <nav className="user-list-nav">
                    <a onClick={this.backRoute}>
                        <Icon type="icon-left"/>
                        <span className="admin-create-nav-label">编辑用户列表</span>
                    </a>
                    <a className="user-list-nav-add" onClick={listMethods.add}>
                        <Icon type="icon-add"/>
                    </a>
                </nav>
                <main className="user-list-content">
                    {listMethods.init()}
                </main>
                <Modal
                    submitText="提交"
                    placeholder="输入用户名"
                    onCancel={modalMethods.cancel}
                    onSubmit={modalMethods.submit}
                    onChange={modalMethods.valueChange}
                    visible={modal.visible}
                    value={modal.value}
                    title={this.modal.action === 'add' ? '添加用户' : '修改用户名称'}/>
            </SeoContainer>
        )
    }
}

export default withRouter(UserList);