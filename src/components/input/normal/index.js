import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
    }
    onChange = (ev) => {
        const {onChange} = this.props;
        onChange(ev.target.value);
    };

    render() {
        const {placeholder, type, value, className} = this.props;
        return (
            <input
                className={className}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={this.onChange}/>
        )
    }
}

export default Input;