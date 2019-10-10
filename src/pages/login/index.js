import React, {Component} from 'react';
import {Button} from 'antd';
import SeoContainer from '&components/seo-container';
import {withRouter} from 'react-router-dom';
import loginTheme from '&images/loginTheme.png';
import './styles.less';

class Login extends Component {
    constructor(props) {
        super(props);
    }
    login = (e) => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/admin/home');
    };
    render() {
        return (
            <SeoContainer title="颐嘉餐厅-登录">
                <div id="login-page">
                    <img className="login-theme" src={loginTheme}/>
                    <form className="form" onSubmit={this.login}>
                        <div className="form-item">
                            <span className="form-item-label">用户名</span>
                            <input className="form-item-input" placeholder="输入用户名" type="text"/>
                        </div>
                        <div className="form-item">
                            <span className="form-item-label">密码</span>
                            <input className="form-item-input" placeholder="输入密码" type="password"/>
                        </div>
                        <Button type="primary" htmlType="submit" block>登录</Button>
                    </form>
                </div>
            </SeoContainer>
        )
    }
}

export default withRouter(Login);