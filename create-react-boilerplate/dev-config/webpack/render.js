// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

//判断当前是否处于开发状态下
const __DEV__ = (process.env.NODE_ENV || "development") === "development";

/**
 * @function 封装之后的渲染方法
 * @param App 待渲染的应用
 * @param root 目标挂载点
 * @param path 根组件路径
 * @param pwa 是否开启 PWA 支持
 */
const clientRender = (App = <div/>,
                      root,
                      path,
                      pwa = false) => {

  //如果是开发模式下
  if (__DEV__) {

    //重定义渲染函数
    const render = (Component) => {
      ReactDOM.render(
        <AppContainer>
          {Component}
        </AppContainer>,
        root
      );
    };

    render(App);

    // Hot Module Replacement API
    if (module.hot) {
      module.hot.accept(path, () => {
        render(App)
      });
    }
  } else {

    ReactDOM.render(
      App,
      root
    );

    if (pwa) {
      require('offline-plugin/runtime').install();
    }
  }

};

export default clientRender;