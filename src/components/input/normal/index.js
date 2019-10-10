import React from 'react';
import './styles.less';

class LoginInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {placeholder, type} = this.props;
        return (
            <div className="form-item-wrapper">
                <input className="form-input" placeholder={placeholder} type={type ? type : 'text'}/>
            </div>
        )
    }
}

export default LoginInput;