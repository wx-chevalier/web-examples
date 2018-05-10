import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../component/Counter';
import { incrementAsync, decrementAsync } from '../ducks/count-promise';

export class PromiseCounter extends Component {
  render() {
    return (
      <div>
        <h1>基于 Promise 的异步计数器</h1>
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
    count: state.promiseCount
  }),
  dispatch => {
    return bindActionCreators(
      {
        increment: incrementAsync,
        decrement: decrementAsync
      },
      dispatch
    );
  }
)(PromiseCounter);
