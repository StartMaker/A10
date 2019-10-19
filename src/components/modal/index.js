import React from 'react';
import {Modal} from 'antd-mobile';
import './styles.less';

class CategoryModal extends React.Component {
    constructor(props) {
        super(props);
    }
    inputChange = (ev) => {
        const {onChange} = this.props;
        onChange(ev.target.value);
    };

    render() {
        const {
            visible,
            value,
            title,
            onSubmit,
            onCancel,
            placeholder,
            submitText
        } = this.props;
        return (
            <Modal
                className="dishesCategory-modal am-modal-transparent"
                visible={visible}
                footer={[
                    {
                        text: submitText,
                        onPress: onSubmit
                    },
                    {
                        text: '取消',
                        onPress: onCancel
                    }
                ]}
                title={title}>
                <input
                    onChange={this.inputChange}
                    value={value}
                    className="modal-input"
                    type="text"
                    placeholder={placeholder}/>
            </Modal>
        )
    }
}

export default CategoryModal;