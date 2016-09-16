/**
 * Created by apple on 16/9/13.
 */
import React, { Component, PropTypes } from 'react';
import { Router, hashHistory } from 'react-router';
import { render } from 'react-dom';
import routes from './container/routes';

//在浏览器环境下使用hashHistory
const router = <Router history={hashHistory}>{routes}</Router>

//将组件渲染到DOM中
render(
  router,
  document.getElementById('root')
);