/**
 * Created by apple on 16/9/13.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";

import { login, logout } from "../../../../../shared/api/auth";
/**
 * @function 登陆页面组件
 */
export default class Login extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  /**
   * @function 默认渲染函数
   * @return {XML}
   */
  render() {
    const { history } = this.props;

    return (
      <section className="login__container">
        登陆界面

        <div>
          <button
            onClick={async () => {
              //将登陆信息写入cookies与localStorage
              await login();
              history.push("/auth/private");
            }}
          >
            点击登陆
          </button>

          <button
            onClick={async () => {
              //将登陆信息写入cookies与localStorage
              await logout();
              //登陆成功跳转到详情页
              history.push("/auth");
            }}
          >
            点击登出
          </button>
        </div>

      </section>
    );
  }
}
