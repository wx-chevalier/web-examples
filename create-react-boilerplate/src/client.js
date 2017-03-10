/**
 * Created by apple on 16/9/13.
 */
import React, { Component, PropTypes } from 'react';
import { Router, browserHistory, hashHistory } from 'react-router';
import { render } from 'react-dom';
import getRoutes from './pwa/routes';
import clientRender from '../dev-config/webpack/render';

let history;

//判断是否为SSR从而确定应该选用哪个History
if (__SSR__) {
  //如果是浏览器环境,则使用browserHistory
  history = browserHistory;
} else {
  //如果是独立环境,则使用hashHistory
  history = hashHistory;
}

//在浏览器环境下使用hashHistory
const router = <Router history={history}>
  {getRoutes(localStorage)}
</Router>;

//将组件渲染到DOM中
clientRender(
  router,
  document.getElementById('root'),
  './routes',
  true
);