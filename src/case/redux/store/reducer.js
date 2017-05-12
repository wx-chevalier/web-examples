import { combineReducers } from 'redux';
import appReducer from '../ducks/app';
import countReducer from '../ducks/count';
import authReducer from '../ducks/auth';
import { routerReducer } from 'react-router-redux';

export default combineReducers({

  //通用的APPReducer
  app: appReducer,

  //计数器Reducer
  count: countReducer,

  //认证所需要的Reducer
  auth: authReducer,

  //挂载处理路由
  routing: routerReducer

});