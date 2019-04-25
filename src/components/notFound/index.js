import React from "react";
import {Link,withRouter} from "react-router-dom";
import {render} from 'react-dom';

import "./styles.less";

class NotFound extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount() {
        console.log(this.props);
    }
    goBack = () => {
        const {history} = this.props;
        history.goBack();
    };
    goLogin = () => {
        const {history} = this.props;
        history.push('/login');
    };
    render() {
        return (
            <div id='notFound'>
                <h1>404</h1>
                <h4>Not Found</h4>
                <a onClick={this.goBack}>Go Back</a>
                <a onClick={this.goLogin}>Go Back</a>
            </div>
        );
    }
}
export default withRouter(NotFound);