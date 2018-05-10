import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

// import promiseMiddleware from './middleware/promiseMiddleware'; // 使用自定义版本的 promiseMiddleware
import promiseMiddleware from 'redux-promise';

import rootReducer from './reducer';

// 从总的 reducers 文件中获取所有的 Reducer

export default (initialState = {}) => {
  // ======================================================
  // 中间件配置
  // ======================================================

  const middleware = [thunk, promiseMiddleware];

  // ======================================================
  // 构建 Store 实例
  // ======================================================

  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

  const store = createStoreWithMiddleware(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  /**
   * @function 保证Redux Reducer的热加载
   */
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      //替换Store中的Reducer
      store.replaceReducer(require('./reducer'));
    });
  }

  return store;
};
