import React from "react";
import {Layout} from "antd";
import {withRouter} from "react-router-dom";
import Media from 'react-media';

const {Header,Footer,Content} = Layout;

import MyMenu from './components/nav';
import logo from '../static/image/logo_.jpg';
import './styles.less';
import Form from './containers/login-form/index';
import MySmallMenu from './components/smallNav/index';

class LoginPage extends React.Component{
    constructor(props){
        super(props);
    }

    static defaultProps = {
        copyRight: '三只小猪',
        nav:{
            items: [
                {
                    url: '/contract',
                    text: '联系我们'
                },
                {
                    url: '/about',
                    text: '关于我们'
                }
            ],
            mode:'horizontal'
        },
    };
    render(){
        return (
            <Layout page='login'>
                <Header>
                    <div className='logo'>
                        <img src={logo} alt='BI平台' title='五只小猪'/>
                    </div>
                    <Media query='(min-width: 769px)'>
                        <MyMenu nav={this.props.nav}/>
                    </Media>
                    <Media query='(max-width: 768px)'>
                        <MySmallMenu nav={this.props.nav}/>
                    </Media>
                </Header>
                <Layout>
                    <Content>
                        <div className='black-bg'></div>
                        <Form/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
export default withRouter(LoginPage);