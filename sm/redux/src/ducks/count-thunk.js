/** 定义Actions */
export const INCREMENT = 'THUNK/INCREMENT';

export const DECREMENT = 'THUNK/DECREMENT';

/** 定义 Reducer */
export default (state = 0, { type, payload }) => {
  switch (type) {
    case INCREMENT:
      return state + payload;
    case DECREMENT:
      return state - payload;
    default:
      return state;
  }
};

/** 使用 Thunk 进行在这里进行异步加操作 */
export const incrementAsync = delta => {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch({
        type: INCREMENT,
        payload: delta
      });
    }, 1000);
  };
};

export const decrementAsync = delta => {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch({
        type: DECREMENT,
        payload: delta
      });
    }, 1000);
  };
};
