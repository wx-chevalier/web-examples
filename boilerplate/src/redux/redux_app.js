/**
 * Created by apple on 16/9/13.
 */
import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory, hashHistory } from 'react-router';
import { render } from 'react-dom';
import getRoutes from './routes';
import createStore from './store/store';
import { syncHistoryWithStore } from 'react-router-redux';


//浏览历史
let history;

//初始状态
let initialState = {};

//判断是否为SSR从而确定应该选用哪个History
if (__SSR__) {

  //如果是浏览器环境,则使用browserHistory
  history = browserHistory;

  //从同构的界面中获取到初始状态
  initialState = window.__INITIAL_STATE__;

} else {
  //如果是独立环境,则使用hashHistory
  history = hashHistory;
}

//构建Redux Store
const store = createStore(history, initialState);

// //将History与Store绑定
const enhancedHistory = syncHistoryWithStore(history, store);

//在浏览器环境下使用hashHistory
const router = <Router history={enhancedHistory}>
  {getRoutes(store)}
</Router>;


//将组件渲染到DOM中
render(
  <Provider store={store} key="provider">
    {router}
  </Provider>,
  document.getElementById('root')
);