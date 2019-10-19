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
        const {value, children, placeholder} = this.props;
        return (
            <select
                placeholder={placeholder}
                value={value}
                onChange={this.onChange}>
                {children}
            </select>
        )
    }
}

export default Select;