import React from 'react';
import './styles.less';
import TopBar from '../../components/TopBar';
import Img from './right.svg';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <TopBar/>
                <nav className="home-nav">
                    <div className="home-nav-logo">
                        <img src="https://s02.mifile.cn/assets/static/image/mi-logo.png"/>
                    </div>
                    <ul className="nav-list">
                        <li className="nav-list-item">小米手机</li>
                        <li className="nav-list-item">Redmi红米</li>
                        <li className="nav-list-item">电视</li>
                        <li className="nav-list-item">笔记本</li>
                        <li className="nav-list-item">家电</li>
                        <li className="nav-list-item">路由器</li>
                        <li className="nav-list-item">智能硬件</li>
                        <li className="nav-list-item">服务</li>
                        <li className="nav-list-item">社区</li>
                    </ul>
                    <div className="nav-search">
                        <input className="nav-search-input"/>
                        <img src={''}/>
                    </div>
                </nav>
                <main className="home-content">
                    <div className="main-nav">
                        <ul className="main-nav-left">
                            <li className="main-nav-left-item">手机 电话卡</li>
                            <li className="main-nav-left-item">电视 盒子</li>
                            <li className="main-nav-left-item">笔记本 平板</li>
                            <li className="main-nav-left-item">家电 插线板</li>
                            <li className="main-nav-left-item">出行 穿戴</li>
                            <li className="main-nav-left-item">智能 路由器</li>
                            <li className="main-nav-left-item">电源 配件</li>
                            <li className="main-nav-left-item">健康 儿童</li>
                            <li className="main-nav-left-item">耳机 音箱</li>
                            <li className="main-nav-left-item">生活 箱包</li>
                        </ul>
                        <div className="main-nav-right">
                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1b1d3d2a8e50d6445d471322b70d3aea.jpg?thumb=1&w=1226&h=460&f=webp&q=90"/>
                        </div>
                    </div>
                    <div className="main-container">
                        <h2 className="main-container-title">小米闪购</h2>
                        <div className="main-section">
                            <ul className="main-section-container">
                                <li className="main-section-container-item">
                                    <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1562056084.63169068.jpg?thumb=1&w=200&h=200"/>
                                    <h4>小米CC9 6GB+128GB 暗夜王子</h4>
                                    <p>3200万自拍，4800万三摄</p>
                                    <p>1899元</p>
                                </li>
                                <li className="main-section-container-item">
                                    <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1562056084.63169068.jpg?thumb=1&w=200&h=200"/>
                                    <h4>小米CC9 6GB+128GB 暗夜王子</h4>
                                    <p>3200万自拍，4800万三摄</p>
                                    <p>1899元</p>
                                </li>
                                <li className="main-section-container-item">
                                    <img src="https://i8.mifile.cn/v1/a1/381d81ba-237f-093b-28a0-ebcfea24dc3d!200x200.jpg"/>
                                    <h4>小米CC9 6GB+128GB 暗夜王子</h4>
                                    <p>3200万自拍，4800万三摄</p>
                                    <p>1899元</p>
                                </li>
                                <li className="main-section-container-item">
                                    <img src="https://i8.mifile.cn/a1/pms_1565339450.93196576!200x200.jpg"/>
                                    <h4>小米CC9 6GB+128GB 暗夜王子</h4>
                                    <p>3200万自拍，4800万三摄</p>
                                    <p>1899元</p>
                                </li>
                                <li className="main-section-container-item">
                                    <img src="https://i8.mifile.cn/a1/pms_1553936761.9167094!200x200.jpg"/>
                                    <h4>小米CC9 6GB+128GB 暗夜王子</h4>
                                    <p>3200万自拍，4800万三摄</p>
                                    <p>1899元</p>
                                </li>
                            </ul>
                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/84e25a9a5f69e4eb88f1df608118fa67.jpg?thumb=1&w=1226&h=120&f=webp&q=90"/>
                        </div>
                        <div className="main-section main-section-margin">
                            <div className="section-sider">
                                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/79ed6663b57e30554a5d1f0653c68b78.jpg?thumb=1&w=234&h=614&f=webp&q=90"/>
                            </div>
                            <div className="main-section-container-right">
                                <ul className="main-section-container">
                                    <li className="main-section-container-item"></li>
                                    <li className="main-section-container-item"></li>
                                    <li className="main-section-container-item"></li>
                                    <li className="main-section-container-item"></li>
                                    <li className="main-section-container-item"></li>
                                    <li className="main-section-container-item"></li>
                                    <li className="main-section-container-item"></li>
                                    <li className="main-section-container-item"></li>
                                </ul>
                            </div>
                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e64bcac4e4b7c2ceb94f277bbc57ad45.jpg?thumb=1&w=1226&h=120&f=webp&q=90"/>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default Home;