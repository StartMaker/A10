import React from 'react';
import {Button} from 'antd-mobile';
import './styles.less';

class PrimaryButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {onClick, children, type} = this.props;
        return (
            <Button tabIndex="btn" type={type} onClick={onClick}>{children}</Button>
        )
    }
}

export default PrimaryButton;