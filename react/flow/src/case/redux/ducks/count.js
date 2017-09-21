/**
 * Created by apple on 16/10/11.
 */
// no changes here 😀

/**
 * @function 定义Actions
 * @type {string}
 */
export const INCREMENT_COUNT = 'INCREMENT';

export const DECREMENT_COUNT = 'DECREMENT';

/**
 * @function 定义Reducer
 * @param state
 * @param action
 * @return {number}
 */
export default (state = 0, {type}) => {
  switch (type) {
    case INCREMENT_COUNT:
      return state + 1;
    case DECREMENT_COUNT:
      return state - 1;
    default:
      return state
  }
}

/**
 *@region 定义Action Creator
 */

/**
 * @function 触发加1操作
 * @return {{type: string}}
 */
export const increment = ()=> {

  return {
    type: INCREMENT_COUNT
  }

};

/**
 * @function 在这里进行异步加1操作
 * @return {function(*)}
 */
export const incrementAsync = ()=> {

  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
};

/**
 * @function 执行计数器减一操作
 * @return {{type: string}}
 */
export const decrement = ()=> {

  return {
    type: DECREMENT_COUNT
  }

};