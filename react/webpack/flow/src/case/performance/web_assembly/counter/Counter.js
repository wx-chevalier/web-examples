// @flow

import React, { PureComponent } from "react";

import CounterWASM from "./counter.wasm";
import Button from "antd/es/button/button";

import "./Counter.scss";

/**
 * Description 简单计数器示例
 */
export default class Counter extends PureComponent {
  state = {
    count: 0
  };

  componentDidMount() {
    this.counter = new CounterWASM({
      env: {
        memoryBase: 0,
        tableBase: 0,
        memory: new window.WebAssembly.Memory({ initial: 256 }),
        table: new window.WebAssembly.Table({ initial: 0, element: "anyfunc" })
      }
    });
    this.setState({
      count: this.counter.exports._count()
    });
  }

  /**
   * Description 默认渲染函数
   */
  render() {
    const isWASMSupport = "WebAssembly" in window;

    if (!isWASMSupport) {
      return (
        <div>
          浏览器不支持 WASM
        </div>
      );
    }

    return (
      <div className="Counter__container">
        <span>
          简单计数器示例：
        </span>
        <span>{this.state.count}</span>
        <Button
          type="primary"
          onClick={() => {
            this.setState({
              count: this.counter.exports._count()
            });
          }}
        >
          点击自增
        </Button>
      </div>
    );
  }
}
