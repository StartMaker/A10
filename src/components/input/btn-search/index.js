import React, {Fragment} from 'react';
import Icon from '&icons';
import './styles.less';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false
        };
    }
    turnSearch = () => {
        this.setState({
            search: !this.state.search
        });
    };

    render() {
        return (
            <div className="nav-search-wrapper">
                {
                    this.state.search
                        ? (
                            <Fragment>
                                <div className="nav-search-btn nav-search">
                                    <Icon type="icon-search"/>
                                    <input
                                        autoFocus
                                        className="search-input"
                                        type="text"
                                        placeholder="搜索"/>
                                </div>
                                <a className="cancel-search" tabIndex="1" onClick={this.turnSearch}>取消</a>
                            </Fragment>
                        ) : (
                            <div
                                className="nav-search-btn"
                                onClick={this.turnSearch}>
                                <Icon type="icon-search"/>
                                <span className="label">搜索</span>
                            </div>
                        )
                }
            </div>
        )
    }
}

export default Search;