/**
 * Created by apple on 16/9/13.
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export class Home extends Component {
  render() {
    return <section className="home__container">
      王下邀月熊

      <li><Link to="/detail">详情页</Link></li>
      <li><Link to="/login">登陆页</Link></li>

    </section>
  }
}