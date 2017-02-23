// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

//判断当前是否处于开发状态下
const __DEV__ = (process.env.NODE_ENV || "development") === "development";

const optionalRender = (App, root, path) => {

  //重定义渲染函数
  const render = (Component) => {
    ReactDOM.render(
      <AppContainer>
        {Component}
      </AppContainer>,
      root
    );
  };

  //如果是开发模式下
  if (__DEV__) {
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
    )
  }

};

export default optionalRender;