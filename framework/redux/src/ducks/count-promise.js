import { createAction, handleActions } from 'redux-actions';

const INCREMENT = 'PROMISE/INCREMENT';

const DECREMENT = 'PROMISE/DECREMENT';

export const incrementAsync = createAction(INCREMENT, async delta => {
  return delta;
});

export const decrementAsync = createAction(DECREMENT, async delta => {
  return delta;
});

export default handleActions(
  {
    [INCREMENT]: (state, action) => state + action.payload,

    [DECREMENT]: (state, action) => state - action.payload
  },
  10
);
