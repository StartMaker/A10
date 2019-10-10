import React from 'react';
import SeoContainer from '&components/seo-container';
import Footer from '&components/footer';
import {Route, Switch, withRouter} from 'react-router-dom';
import Cargo from './cargo';
import Dishes from './dishes';

class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    // componentDidMount() {
    //     const {history, match} = this.props;
    //     history.push(match.url + '/pp')
    // }

    render() {
        const {match} = this.props;
        return (
            <SeoContainer title="颐嘉餐厅-首页">
                <Switch>
                    <Route exact path={`${match.url}/dishes`} component={Dishes}/>
                    <Route path={`${match.url}/cargo`} component={Cargo}/>
                </Switch>
                <Footer/>
            </SeoContainer>
        )
    }
}

export default withRouter(Index);