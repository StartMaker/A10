import React from 'react';
import {Form, Row, Col, Button, Divider, Checkbox, Input, Icon} from 'antd';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import MyInput from '../../components/input';
import {Login} from "../../../../action/ajax";

class LoginForm extends React.Component{
    constructor(props){
        super(props);
    }
    shouldComponentUpdate() {
        return false;
    }
    componentDidMount() {
        console.log(this);
    }
    login = (ev) => {
        ev.preventDefault();
        const {dispatch, history} = this.props;
        history.push({pathname:'/homepage'});
        // if(this.username.state.value === ''||this.password.state.value === ''){
        //     return ;
        // }
        // Login({
        //     userName:  this.username.state.value,
        //     userPassword: this.password.state.value
        // },dispatch);
        // dispatch(Login({
        //     userName:  this.username.state.value,
        //     userPassword: this.password.state.value
        // }));
    };
    register = () => {
        this.props.history.push({pathname:'/register'});
    };
    render() {
        return (
            <Form onSubmit={this.login}>
                <Form.Item>
                    <p>Uchain Best BI</p>
                    <p>五只小猪</p>
                </Form.Item>
                <Form.Item>
                    <MyInput
                        placeholder='Enter your username'
                        name='username'
                        type='text'
                        iconType='user'
                        ref={node => this.username = node}
                    />
                </Form.Item>
                <Form.Item>
                    <MyInput
                        placeholder='Enter your password'
                        name='password'
                        type='password'
                        iconType='lock'
                        ref={node => this.password = node}
                    />
                </Form.Item>
                <Form.Item>
                    <Checkbox checked={false} className='left'>记住密码</Checkbox>
                    <Checkbox checked={false} className='right'>自动登陆</Checkbox>
                </Form.Item>
                <Form.Item className='login'>
                    <Button type='primary' block={true} htmlType='submit'>登录</Button>
                </Form.Item>
                <Form.Item className='from-register-forget'>
                    <a className='left' onClick={this.register}>免费注册</a>
                    <a className='right'>忘记密码</a>
                </Form.Item>
            </Form>
        );
    }
}

const mapStateToProps = (state) =>{
    const {user} = state;
    return user;
};

export default withRouter(connect(
    mapStateToProps
)(LoginForm));