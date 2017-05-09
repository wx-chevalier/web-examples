/* eslint-disable no-undef */
// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import "antd/dist/antd.min.css";
import Showcase from "../showcase/Showcase";
import { BrowserRouter, HashRouter } from "react-router-dom";
import Helmet from "react-helmet";
import logo from "../logo.svg";
import GithubCorner from "../../shared/component/GithubCorner";
import "./App.scss";

// 将路由放在这边是为了方便进行热加载
const Router = __SSR__ ? BrowserRouter : HashRouter;

export default class App extends Component {
  static propTypes = {
    serverSideMessage: PropTypes.string
  };

  render() {
    const { serverSideMessage } = this.props;
    return (
    <Router>
      <section className="App__container">
        <Helmet title="React Application Demonstration" />
        <GithubCorner />
        <div className="App__header">
          <img src={logo} className="App__logo" alt="logo" />
          <h2>王下邀月熊</h2>
          <h3>React & React Router V4 & PWA 常见模式</h3>
          {/*仅当包含服务端渲染信息时才进行展示*/}
          <h3>{!!serverSideMessage && serverSideMessage}</h3>
        </div>
        <div className="App__showcase">
          <Route path="/" component={Showcase} />
        </div>

      </section>
    </Router>
    );
  }
}
