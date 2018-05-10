import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import countReducer from '../ducks/count';
import thunkReducer from '../ducks/count-thunk';
import promiseReducer from '../ducks/count-promise';
import appReducer from '../ducks/app';
import authReducer from '../ducks/auth';

export default combineReducers({
  // 通用的 APPReducer
  app: appReducer,

  // 同步计数器 Reducer
  count: countReducer,

  // 基于 Thunk 的异步计数器,
  thunkCount: thunkReducer,

  // 基于 Promise 的异步计数器
  promiseCount: promiseReducer,

  // 认证所需要的 Reducer
  auth: authReducer,

  // 挂载处理路由
  routing: routerReducer
});
