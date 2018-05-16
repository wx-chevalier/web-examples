import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'

// import promiseMiddleware from './middleware/promiseMiddleware'; // 使用自定义版本的 promiseMiddleware
import promiseMiddleware from 'redux-promise';

// 从总的 reducers 文件中获取所有的 Reducer
import rootReducer from './reducer';
import rootSaga from "../sagas/sagas";

const sagaMiddleware = createSagaMiddleware();

export default (initialState = {}) => {
  // ======================================================
  // 中间件配置
  // ======================================================

  const middleware = [thunk, promiseMiddleware, sagaMiddleware];

  // ======================================================
  // 构建 Store 实例
  // ======================================================

  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

  const store = createStoreWithMiddleware(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  sagaMiddleware.run(rootSaga)
  
  /** 保证Redux Reducer的热加载 */
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      // 替换 Store 中的 Reducer
      store.replaceReducer(require('./reducer'));
    });
  }

  return store;
};
