import React, {Fragment} from 'react';
import Icon from '&icons';

class DayMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actives: [false]
        };
    };
    loadMore = (index) => () => {
        const {actives} = this.state;
        actives[index] = !actives[index];
        this.setState({actives});
    };
    render() {
        const {actives} = this.state;
        return (
            <div className="food-menu-item">
                <div className="food-menu-time">2019-8-8</div>
                <Fragment>
                    <div className="food-menu-title">
                        <Icon type="icon-lunch"/>
                        <span className="food-menu-title-label">午餐菜谱</span>
                    </div>
                    <div className={actives[0] ? 'food-menu-dropdown' : 'food-menu-dropdown food-menu-close'}>
                        牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，
                        牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，
                        牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，
                    </div>
                    <a
                        tabIndex="1"
                        className="food-menu-more"
                        onClick={this.loadMore(0)}>
                        {
                            actives[0] ? '收起' : '加载更多...'
                        }
                    </a>
                </Fragment>
                <Fragment>
                    <div className="food-menu-title">
                        <Icon type="icon-lunch"/>
                        <span className="food-menu-title-label">午餐菜谱</span>
                    </div>
                    <div className={actives[1] ? 'food-menu-dropdown' : 'food-menu-dropdown food-menu-close'}>
                        牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，
                        牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，
                        牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，
                    </div>
                    <a
                        tabIndex="1"
                        className="food-menu-more"
                        onClick={this.loadMore(1)}>
                        {
                            actives[1] ? '收起' : '加载更多...'
                        }
                    </a>
                </Fragment>
                <Fragment>
                    <div className="food-menu-title">
                        <Icon type="icon-lunch"/>
                        <span className="food-menu-title-label">午餐菜谱</span>
                    </div>
                    <div className={actives[2] ? 'food-menu-dropdown' : 'food-menu-dropdown food-menu-close'}>
                        牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，
                        牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，
                        牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，牛肉，
                    </div>
                    <a
                        tabIndex="1"
                        className="food-menu-more"
                        onClick={this.loadMore(2)}>
                        {
                            actives[2] ? '收起' : '加载更多...'
                        }
                    </a>
                </Fragment>
            </div>
        )
    }
}

export default DayMenu;