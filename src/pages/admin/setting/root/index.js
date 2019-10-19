import React, {Fragment} from 'react';
import Icon from '&icons';
import {Link} from 'react-router-dom';
import './styles.less';

class Setting extends React.Component {
    constructor(props) {
        super(props);
    }
    loginOut = () => {
        localStorage.setItem('pass-key','');
    };

    render() {
        return (
            <Fragment>
                <div className="setting-nav">
                    <Icon type="icon-setting"/>
                    <span className="setting-title">设置</span>
                </div>
                <div className="setting-content">
                    <div className="setting-container">
                        <Link to="/admin/home/setting/user-list" className="setting-item">
                            <span className="setting-item-label">编辑用户列表</span>
                            <Icon type="icon-right"/>
                        </Link>
                        <Link to="/login" className="setting-item">
                            <span className="setting-item-label">退出登录</span>
                            <Icon type="icon-right"/>
                        </Link>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Setting;