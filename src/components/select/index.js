import React from 'react';

class Select extends React.Component {
    constructor(props) {
        super(props);
    }
    onChange = (ev) => {
        const {onChange} = this.props;
        onChange(ev.target.value);
    };

    render() {
        const {value, children, placeholder, className} = this.props;
        return (
            <select
                className={className ? className : ''}
                placeholder={placeholder}
                value={value}
                onChange={this.onChange}>
                {children}
            </select>
        )
    }
}

export default Select;