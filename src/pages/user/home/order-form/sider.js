import React, {Fragment} from 'react';
import Select from '&components/select';
import {Checkbox} from 'antd-mobile';
import Dropdown from '&components/list-dropdown';

class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                category: '0'
            }
        };
    }
    formMethods = {
        selectChange: (value) => {
            const {form} = this.state;
            form.category = value;
            this.setState({form});
        }
    };

    render() {
        const {formMethods} = this;
        const {changeStatus} = this.props;
        return (
            <Fragment>
                <div className="sider-top">
                    <Select onChange={formMethods.selectChange}>
                        <option value="0">早餐</option>
                        <option value="1">午餐</option>
                    </Select>
                    <div className="btn-group">
                        <a className="submit">提交</a>
                        <a className="cancel" onClick={changeStatus}>取消</a>
                    </div>
                </div>
                <div className="sider-middle">
                    <Dropdown
                        subTitle="222"
                        title="列表1">
                        <div>
                            <Checkbox/>
                            <span className="checkbox-label">牛肉</span>
                        </div>
                    </Dropdown>
                </div>
            </Fragment>
        )
    }
}

export default Sider;