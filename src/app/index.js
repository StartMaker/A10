import React from 'react';
import './styles.less';
import {hot} from 'react-hot-loader';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    axios.get('/api/login');
  }

  render() {
    return (
      <div>
        222
      </div>
    )
  }
}

export default hot(module)(App);