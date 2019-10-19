import React from 'react';
import Icon from '&icons';
import SeoContainer from '&components/seo-container';
import './styles.less';

class FoodMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SeoContainer title="颐嘉餐厅-菜谱">
                <nav className="nav-container">
                    <span className="nav-title">菜谱</span>
                    <Icon type="icon-add"/>
                </nav>
            </SeoContainer>
        )
    }
}

export default FoodMenu;