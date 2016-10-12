/**
 * Created by apple on 16/9/13.
 */
import React, { Component, PropTypes } from 'react';
import { Route, IndexRoute, withRouter, browserHistory } from 'react-router';
import { Login } from './container/login';
import { Home } from './container/home';
import { Detail } from './container/detail';
import { valid_user } from '../react/api/auth';
import Helmet from 'react-helmet';

// 无状态（stateless）组件，一个简单的容器，react-router 会根据 route
// 规则匹配到的组件作为 `props.children` 传入
const Container = (props) => {
  return (
    <div>
      <Helmet title="Redux Application Demonstration"/>
      {props.children}
    </div>
  );
};

/**
 *
 * @param store
 */
export default (store = {})=> {

  //注意,在SSR情况下这里使用的是服务端传入的Store

  /**
   * @function 判断用户是否登陆,如果未登陆则强制性跳转到登录页面
   * @param nextState
   * @param replace
   * @param callback
   */
  async function auth(nextState, replace, callback) {

    //从Store中获取状态
    let state = store.getState();

    //判断键值是否存在
    if (!(state && state.auth && state.auth.userToken)) {

      //如果用户尚未登录,则跳转到登录界面
      replace('/login');

    } else {

      //从Store中获取用户Token
      let userToken = store.getState().auth.userToken;

      //在这里执行异步认证,假设传入的store中包含userToken
      //这里使用Promise执行异步操作
      //如果是SSR,则本部分代码会在服务端运行

      let isValid = await valid_user(userToken);

      //如果用户尚未认证,则进行跳转操作
      isValid || replace('/login');

    }

    //执行回调函数
    callback();

  }

  // route 规则：
  // - `/list` 显示 `List` 组件
  // - `/item/:id` 显示 `Item` 组件
  return (
    <Route path="/" history={browserHistory} component={Container}>
      <IndexRoute component={Home}/>
      <Route path="home" component={withRouter(Home)}/>
      <Route path="login" component={withRouter(Login)}/>
      <Route path="detail" component={withRouter(Detail)} onEnter={auth}/>
    </Route>
  );

}


