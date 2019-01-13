import { createActions, handleActions } from 'redux-actions';

interface IState {
  count: number;
}

const initialState: IState = {
  count: 0
};

export const actions = createActions({
  async incr(step: number = 1) {
    return step;
  }
});

export default handleActions<IState, any>(
  {
    [actions.incr.toString()](state: IState, { error, payload }) {
      return { ...state, count: state.count + payload };
    }
  },
  initialState
);
