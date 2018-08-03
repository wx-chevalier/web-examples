import React, { Component } from 'react';
import { connect } from 'react-redux';
import Counter from '../component/Counter';
import { incrementAsync, decrementAsync } from '../ducks/count-thunk';

export class ThunkCounter extends Component {
  render() {
    return (
      <div>
        <h1>基于 Thunk 的异步计数器</h1>
        <Counter
          count={this.props.count}
          increment={() => {
            this.props.increment(1);
          }}
          decrement={() => {
            this.props.decrement(1);
          }}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    count: state.thunkCount
  }),
  {
    increment: incrementAsync,
    decrement: decrementAsync
  }
)(ThunkCounter);
