import React, {Component} from 'react';
import {Button, Toast} from 'antd-mobile';
import SeoContainer from '&components/seo-container';
import {withRouter} from 'react-router-dom';
import loginTheme from '&images/loginTheme.png';
import Input from '&components/input/normal';
import axios from '&helpers/config/axios';
import './styles.less';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: '',
                password: ''
            },
            submit: {
                loading: false
            }
        }
    }
    login = (e) => {
        e && e.preventDefault();
        const {form} = this.state;
        const {history} = this.props;
        axios.POST('/login', form)
            .then(res => {
                if (res.code === 0) {
                    const {data} = res;
                    data.role === 1 && history.push('/admin/home');
                    data.role === 0 && history.push('/user/home');
                    localStorage.setItem('pass-key',data.token);
                    localStorage.setItem('username', form.username);
                    localStorage.setItem('password', form.password);
                }
                else {
                    Toast.fail(res.msg, 1);
                }
            })
            .catch(err => {
                console.log(err);
                alert('请求失败');
            });
    };
    formObserveChange = (key) => (value) => {
        const {form} = this.state;
        form[key] = value;
        this.setState({form});
    };
    render() {
        const {submit} = this.state;
        return (
            <SeoContainer title="颐嘉餐厅-登录">
                <div id="login-page">
                    <img
                        alt="颐嘉餐厅"
                        title="颐嘉餐厅"
                        className="login-theme"
                        src={loginTheme}
                    />
                    <form className="form">
                        <div className="form-item">
                            <span className="form-item-label">用户名</span>
                            <Input
                                onChange={this.formObserveChange('username')}
                                className="form-item-input"
                                placeholder="输入用户名"
                                type="text"/>
                        </div>
                        <div className="form-item">
                            <span className="form-item-label">密码</span>
                            <Input
                                onChange={this.formObserveChange('password')}
                                className="form-item-input"
                                placeholder="输入密码"
                                type="password"/>
                        </div>
                        <Button
                            loading={submit.loading}
                            type="primary"
                            onClick={this.login}>
                            登录
                        </Button>
                    </form>
                </div>
            </SeoContainer>
        )
    }
}

export default withRouter(Login);