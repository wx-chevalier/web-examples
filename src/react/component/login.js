/**
 * Created by apple on 16/9/13.
 */
import React, { Component, PropTypes } from 'react';
import { login, logout } from '../api/api';

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

      <div>
        <button onClick={()=> {
          //将登陆信息写入cookies与localStorage
          login().then(()=> {
            //登陆成功跳转到详情页
            this.props.router.push('/detail');
          });
        }}>
          点击登陆
        </button>

        <button onClick={()=> {
          //将登陆信息写入cookies与localStorage
          logout();
          //登陆成功跳转到详情页
          this.props.router.push('/');
        }}>
          点击登出
        </button>
      </div>

    </section>
  }
}