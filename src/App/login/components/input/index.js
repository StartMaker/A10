import React from 'react';
import {Icon, Input} from 'antd';

class MyInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
    }
    inputOnchange = (ev) =>{
        this.setState({
            value: ev.target.value
        });
    };
    inputClear = () => {
        this.setState({
            value: ''
        });
    };
    render() {
        const {placeholder,name,type, iconType, ref} = this.props;
        const suffix = this.state.value !== "" ? <Icon type='close-circle' onClick={this.inputClear}/>: <Icon/>;
        return <Input
            placeholder={placeholder}
            value={this.state.value}
            name={name}
            type={type}
            size='large'
            prefix={<Icon type={iconType} style={{ color: 'rgba(0,0,0,.25)' }}/>}
            suffix={suffix}
            ref={ref}
            onChange={this.inputOnchange}/>;
    }
}

export default MyInput;