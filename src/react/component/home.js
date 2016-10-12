/**
 * Created by apple on 16/9/13.
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
require('./home.scss');

/**
 * @function 根页面组件
 */
export class Home extends Component {
  render() {
    return <section className="home__container">

      <div>
        王下邀月熊 Webpack2-React-Redux-Boilerplate
      </div>

      <li><Link to="/detail">详情页(需要先进行登陆操作)</Link></li>
      <li><Link to="/login">登陆页</Link></li>

    </section>
  }
}