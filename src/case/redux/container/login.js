/**
 * Created by apple on 16/9/13.
 */
import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { doLogin, doLogout, doRedirect } from '../ducks/auth';

/**
 * @function 登陆页面组件
 */

@connect(
  state => ({
    auth: state.auth
  }),
  {
    pushState: push,
    doLogin,
    doRedirect,
    doLogout,
  })
export class Login extends Component {

  /**
   * @function 默认渲染函数
   * @return {XML}
   */
  render() {

    const {
      auth:{userToken, loading, error, shouldRedirect},
      pushState, doLogin, doRedirect, doLogout
    } = this.props;

    //判断是否是需要进行跳转
    if (shouldRedirect) {
      //判断是否登录,如果尚未登录跳转到主页,否则跳转到详情页
      if (userToken) {
        doRedirect();
        pushState('/detail');
      } else {
        doRedirect();
        pushState('/');
      }
    }

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