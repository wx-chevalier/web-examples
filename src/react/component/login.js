/**
 * Created by apple on 16/9/13.
 */
import React, { Component, PropTypes } from 'react';

export class Login extends Component {

  /**
   * @function 默认渲染函数
   * @return {XML}
   */
  render() {
    return <section className="login__container">
      登陆界面
      <button>
        点击登陆
      </button>
    </section>
  }
}