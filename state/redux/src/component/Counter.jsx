import React, { PureComponent } from 'react';

export default class Counter extends PureComponent {
  render() {
    const { count, increment, decrement } = this.props;

    return [
      <div>{count}</div>,
      <div>
        <button onClick={increment}>加1</button>
        <button onClick={decrement}>减1</button>
      </div>
    ];
  }
}
