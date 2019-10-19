import React, {Fragment} from 'react';
import Icon from '&icons';
import './styles.less';

class ListDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }
    click = () => {
        const {active} = this.state;
        this.setState({
            active: !active
        });
    };

    render() {
        const {active} = this.state;
        const {title, subTitle} = this.props;
        console.log(this.props);
        return (
            <Fragment>
                <div
                    key={title}
                    onClick={this.click}
                    className={active ? 'dropdown dropdown-active' : 'dropdown'}>
                    <Icon type="icon-triangle"/>
                    <span className="dropdown-label">{title}</span>
                    <span className="dropdown-subTitle">{subTitle}</span>
                </div>
                { active && this.props.children}
            </Fragment>
        )
    }
}

export default ListDropdown;