import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';

class SeoContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>{this.props.title}</title>
                </Helmet>
                {this.props.children}
            </Fragment>
        )
    }
}

export default SeoContainer;