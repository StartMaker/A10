import React, {PureComponent, Component} from 'react';
import './styles.less';
import {Link, withRouter} from 'react-router-dom';
import Icon from '&icons';

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    static defaultProps = {
        navItems: []
    };
    click = (current) => () => {
        let {navItems} = this.props;
        navItems = navItems.map(function (item, index) {
            current === index ? (item.exact = true) : (item.exact = false);
            return item;
        })
    };

    init = () => {
        const {navItems, location} = this.props;
        return navItems.map((item, index) => {
             return (
                 <Link
                     key={item.label}
                     to={item.url}
                     className={location.pathname === item.url ? 'footer-item exact': 'footer-item'}>
                     <div className="icon">
                         <Icon type={item.icon}/>
                     </div>
                     <div className="label">{item.label}</div>
                 </Link>
             );
        });
    };
    render() {
        return (
            <div className="footer">
                {this.init()}
            </div>
        )
    }
}

export default withRouter(Footer);