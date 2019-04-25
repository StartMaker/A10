import React from 'react';
import {Layout, Row} from "antd";

const {Content: Index} = Layout;

import Column from '../../column';
import {Consumer} from '../../../context';

class UploadContent extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Index>
                <Row type='flex'>
                    <Consumer>
                        {
                            (provider) => {
                                const {modules, grid} = provider;
                                return modules.map((value,index) =><Column grid={grid} key={index} {...value}></Column>);
                            }
                        }
                    </Consumer>
                </Row>
            </Index>
        );
    }
}

export default UploadContent;