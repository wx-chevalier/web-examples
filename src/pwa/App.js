// @flow

import React, { Component } from "react";
import { Route } from "react-router-dom";
import "antd/dist/antd.min.css";
import Showcase from "./showcase/Showcase";
import { Router } from "../../dev-config/wrapper/render";
import Helmet from "react-helmet";
import logo from "./logo.svg";
import "./App.scss";
import GithubCorner from "../component/GithubCorner";

export default class App extends Component {
  render() {
    return (
      <Router>
        <section className="App__container">
          <Helmet title="React Application Demonstration" />
          <GithubCorner />
          <div className="App__header">
            <img src={logo} className="App__logo" alt="logo" />
            <h2>王下邀月熊</h2>
            <h3>React & React Router V4 & PWA 常见模式</h3>
          </div>
          <div className="App__showcase">
            <Route path="/" component={Showcase} />
          </div>

        </section>
      </Router>
    );
  }
}
