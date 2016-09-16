/**
 * Created by apple on 16/9/13.
 */
import React, { Component, PropTypes } from 'react';
import { Route, IndexRoute, withRouter } from 'react-router';
import { Login } from '../component/login';
import { Home } from '../component/home';
import { Detail } from '../component/detail';


// 无状态（stateless）组件，一个简单的容器，react-router 会根据 route
// 规则匹配到的组件作为 `props.children` 传入
const Container = (props) => {
  return (
    <div>{props.children}</div>
  );
};

/**
 * @function 判断用户是否登陆,如果未登陆则强制性跳转到登录页面
 * @param nextState
 * @param replace
 * @param callback
 */
function userIsLogin(nextState, replace, callback) {

  replace('/login');
  callback();

}

// route 规则：
// - `/list` 显示 `List` 组件
// - `/item/:id` 显示 `Item` 组件
const routes = (
  <Route path="/" component={Container}>
    <IndexRoute component={Home}/>
    <Route path="home" component={withRouter(Home)}/>
    <Route path="login" component={withRouter(Login)}/>
    <Route path="detail" component={withRouter(Detail)} onEnter={userIsLogin}/>
  </Route>
);

export default routes;