import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

// 声明外部模块
declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
};

declare var process: {
  env: {
    NODE_ENV: string
  }
};

//判断当前是否处于开发状态下
const __DEV__ = (process.env.NODE_ENV || "development") === "development";

/**
 * @function 封装之后的渲染方法
 * @param App 待渲染的应用
 * @param rootElement
 * @param rootComponentPath
 * @param pwa 是否开启 PWA 支持
 */
export const clientRender = (
  App = <div />,
  rootElement: Element,
  rootComponentPath: string,
  pwa: boolean = false
) => {
  //如果是开发模式下
  if (__DEV__) {
    //重定义渲染函数
    const render = Component => {
      ReactDOM.render(
        <AppContainer>
          {Component}
        </AppContainer>,
        rootElement
      );
    };

    render(App);

    // 热加载应用
    if (module && module.hot) {
      module.hot.accept(rootComponentPath, () => {
        render(App);
      });
    }
  } else {
    ReactDOM.render(App, rootElement);

    if (pwa) {
      // 使用 PWA 插件
      require("offline-plugin/runtime").install();
    }
  }
};
