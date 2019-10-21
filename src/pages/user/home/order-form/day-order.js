import React, {Fragment} from 'react';
import Icon from '&icons';

class DayOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actives: [false]
        };
    };
    loadMore = (index) => () => {
        const {actives} = this.state;
        actives[index] = !actives[index];
        this.setState({actives});
    };
    render() {
        const {actives} = this.state;
        return (
            <div className="order-menu-item">

            </div>
        )
    }
}

export default DayOrder;