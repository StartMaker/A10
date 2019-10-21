import React, {Fragment} from 'react';
import Select from '&components/select';
import {Checkbox, Toast} from 'antd-mobile';
import Dropdown from '&components/list-dropdown';
import axios from '&helpers/config/axios';

class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                foodType: '0',
                menuBaseId: []
            },
            formObserve: {},
            list: {
                dataSource: []
            }
        };
    }
    formMethods = {
        selectChange: (value) => {
            const {form} = this.state;
            form.foodType = value;
            this.setState({form});
        },
        checkBoxChange: (id) => () => {
            const {formObserve, form} = this.state;
            if (formObserve[id]) {
                formObserve[id] = false;
                form.menuBaseId.splice(form.menuBaseId.indexOf(id), 1);
            }
            else {
                formObserve[id] = true;
                form.menuBaseId.push(id);
            }
            this.setState({form, formObserve});
        },
        submit: () => {
            const {form} = this.state;
            const params = {
                creatTime: new Date().getTime(),
                dto: [form]
            };
            if (form.menuBaseId.length === 0) {
                Toast.fail('请添加菜品',1);
                return;
            }
            axios.POST('/menu/insert', params)
                .then(res => {
                    if (res.code === 0) {
                        this.listMethods.close();
                        Toast.success('添加成功',1);
                    }
                    else {
                        Toast.fail(res.msg, 1);
                    }
                })
                .catch(err => {
                    alert('网络异常');
                });
        }
    };
    listMethods = {
        init: () => {
            const {list, formObserve} = this.state;
            const {formMethods} = this;
            return list.dataSource.map(item => {
                return (
                    <Dropdown
                        key={item.id}
                        subTitle={item.sum}
                        title={item.menuBaseType}>
                        {
                            item.menuBaseVOList.map(item => {
                                return (
                                    <div key={item.id}>
                                        <Checkbox
                                            checked={formObserve[item.id]}
                                            onChange={formMethods.checkBoxChange(item.id)}>
                                            <span
                                                className="checkbox-label">
                                                {item.productName}
                                            </span>
                                        </Checkbox>
                                    </div>
                                );
                            })
                        }
                    </Dropdown>
                )
            });
        },
        close: ()  => {
            const {changeStatus} = this.props;
            this.setState({
                form: {
                    foodType: '0',
                    menuBaseId: []
                },
                formObserve: {}
            });
            changeStatus();
        }
    };
    componentDidMount() {
        axios.GET('/menu/base/all')
            .then(res => {
                if (res.code === 0) {
                    const {list} = this.state;
                    list.dataSource = res.data;
                    this.setState({list});
                }
                else {
                    Toast.fail(res.msg, 1);
                }
            })
            .catch(err => {
                alert('网络异常');
            });
    }

    render() {
        const {formMethods, listMethods} = this;
        const {form} = this.state;
        return (
            <Fragment>
                <div className="sider-top">
                    <Select
                        value={form.foodType}
                        className="sider-top-select"
                        onChange={formMethods.selectChange}>
                        <option value="0">早餐</option>
                        <option value="1">午餐</option>
                    </Select>
                    <div className="btn-group">
                        <a className="submit" onClick={formMethods.submit}>提交</a>
                        <a className="cancel" onClick={listMethods.close}>取消</a>
                    </div>
                </div>
                <div className="sider-middle">
                    {listMethods.init()}
                </div>
            </Fragment>
        )
    }
}

export default Sider;