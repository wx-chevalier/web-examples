/**
 * Created by apple on 16/9/13.
 */
import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { doLogin, doLogout } from '../ducks/auth';

/**
 * @function 登陆页面组件
 */

@connect(
  state => ({
    auth : state.auth
  }),
  {
    pushState: push,
    doLogin,
    doLogout,
  })
export class Login extends Component {

  /**
   * @function 默认渲染函数
   * @return {XML}
   */
  render() {

    const {
      userToken, loading,
      pushState, doLogin, doLogout
    } = this.props;

    //判断是否是需要进行跳转
    if()

    return <section className="login__container">
      登陆界面:{userToken ? '已登录' : '未登录'}:{loading ? '正在校验' : '非校验中'}
      <div>
        <button onClick={doLogin}>
          点击登陆
        </button>

        <button onClick={doLogout}>
          点击登出
        </button>
      </div>

    </section>
  }
}