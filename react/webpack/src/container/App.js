/* eslint-disable no-undef */


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import { BackTop } from 'antd';

import logo from './logo.svg';
import GithubCorner from '../component/GithubCorner';
import ShowcaseWelcome from '../component/ShowcaseWelcome';

import './App.scss';

// 将路由放在这边是为了方便进行热加载
const Router = __SSR__ ? BrowserRouter : HashRouter;

export default class App extends Component {
  static propTypes = {
    serverSideMessage: PropTypes.string
  };
  static defaultProps = {
    serverSideMessage: 'message'
  };

  render() {
    const { serverSideMessage } = this.props;
    return (
      <Router>
        <section className="App__container">
          <Helmet title="React Application Demonstration">
            <link
              rel="stylesheet"
              href="https://unpkg.com/sakura.css/css/sakura.css"
              type="text/css"
            />
          </Helmet>
          <GithubCorner />
          <div className="App__header">
            <img src={logo} className="App__logo" alt="logo" />
            <h4>王下邀月熊</h4>
            <h5>React & React Router V4 & PWA 常见模式</h5>
            {/* 仅当包含服务端渲染信息时才进行展示*/}
            <h5>{!!serverSideMessage && serverSideMessage}</h5>
          </div>
          <div className="App__showcase">
            <Route path="/" component={ShowcaseWelcome} />
          </div>
          <BackTop />
        </section>
      </Router>
    );
  }
}

// 额外进行全局配置
