import React, { Component } from 'react';

import Operation from './components/operation.jsx';
import PriceAndAvailibility from './components/price-and-availibility.jsx';

export default class App extends Component {
    render() {
        return (
          <div>
            <Operation />
            <PriceAndAvailibility />
          </div>
        );
    }
}
