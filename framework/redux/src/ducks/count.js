/** 定义Actions */
export const INCREMENT = 'INCREMENT';

export const DECREMENT = 'DECREMENT';

/** 定义 Reducer */
export default (state = 0, { type }) => {
  switch (type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

/** 定义Action Creator */

/** 触发加 1 操作 */
export const increment = () => {
  return {
    type: INCREMENT
  };
};

/** 执行计数器减一操作*/
export const decrement = () => {
  return {
    type: DECREMENT
  };
};
