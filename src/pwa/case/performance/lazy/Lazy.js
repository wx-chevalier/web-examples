// @flow

import React, { Component } from "react";
import { Button } from "antd";
import { ShowcaseHeader } from "../../../showcase/showcase_decorator";
import "./Lazy.scss";
import { LoadableLazyComponent } from "./loadable/LoadableLazyComponent";
import ExternalDependedComponent from "./external/ExternalDependedComponent";
export default class Lazy extends Component {
  state = {
    isLoadLazyComponent: false,
    isLoadExternalScript: false
  };

  render() {
    return (
      <section className="Lazy__container">
        <div className="Showcase__case_header">
          <ShowcaseHeader title={"懒加载"} description={"懒加载某些组件或者外部脚本"} />
        </div>

        <div className="Lazy__buttons">
          <Button
            onClick={() => {
              this.setState({
                isLoadExternalScript: true
              });
            }}
            type="primary"
            icon="download"
          >
            点击加载外部脚本
          </Button>
          <Button
            onClick={() => {
              this.setState({
                isLoadLazyComponent: true
              });
            }}
            icon="download"
          >
            点击加载延迟组件
          </Button>
        </div>

        <div className="Lazy__components">
          {this.state.isLoadLazyComponent ? <LoadableLazyComponent /> : null}
          {this.state.isLoadExternalScript
            ? <ExternalDependedComponent />
            : null}
        </div>
      </section>
    );
  }
}
