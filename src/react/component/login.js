/**
 * Created by apple on 16/9/13.
 */
import React, { Component, PropTypes } from 'react';

/**
 * @function 登陆页面组件
 */
export class Login extends Component {

  /**
   * @function 默认渲染函数
   * @return {XML}
   */
  render() {
    return <section className="login__container">
      登陆界面
      <button onClick={()=> {
        alert(1)
      }}>
        点击登陆
      </button>
    </section>
  }
}