import React, { Component } from 'react';
import { connect } from 'react-redux';
import Counter from '../component/Counter';
import { increment, decrement } from '../ducks/count';

export class SyncCounter extends Component {
  render() {
    return (
      <div>
        <h1>同步计数器</h1>
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
    count: state.count
  }),
  {
    increment,
    decrement
  }
)(SyncCounter);
