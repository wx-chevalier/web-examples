import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../component/Counter';
import { incrementAsync, decrementAsync } from '../ducks/count-promise';

export class SagasCounter extends Component {
  render() {
    return (
      <div>
        <h1>基于 Sagas 的异步计数器</h1>
        <Counter
          count={this.props.count}
          increment={() => {
            this.props.dispatch({
              type: 'SAGA_INCREMENT_ASYNC'
            });
          }}
          decrement={() => {
            this.props.dispatch({
              type: 'SAGA_DECREMENT'
            });
          }}
        />
      </div>
    );
  }
}

export default connect(state => ({
  count: state.sagaCount
}))(SagasCounter);
