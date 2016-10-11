# Webpack2 React Redux Boilerplate

> 核心组件代码与脚手架之间务必存在有机分割，整个程序架构清晰易懂

Page-Driven Webpack Boilerplate For React-Redux Work Flow

It is initial from 




## Reference

参考的其他模板项目:
- [react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate)
- [react-boilerplate](https://github.com/mxstbr/react-boilerplate)
- [react-redux-saga-boilerplate](https://github.com/gilbarbara/react-redux-saga-boilerplate)
- [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example)

推荐阅读文章:
- [webpack-for-the-fast-and-the-furious](https://medium.freecodecamp.com/webpack-for-the-fast-and-the-furious-bf8d3746adbd#.poot9r5ee)
- [react-project](https://github.com/ryanflorence/react-project#lazy)

## Features

本部分假设你已经对Webpack有了大概的了解，这里我们会针对笔者自己在生产环境下使用的Webpack编译脚本进行的一个总结，在介绍具体的配置方案之前笔者想先概述下该配置文件的设计的目标，或者说是笔者认为一个前端编译环境应该达成的特性，这样以后即使Webpack被淘汰了也可以利用其他的譬如JSPM之类的来完成类似的工作。

- 考虑到同一项目对多编译目标的支持，包括开发需求、纯前端运行需求（包括Cordova、APICloud、Weapp这种面向移动端的方案）、同构直出需求，并且保证项目可以在这三个环境之间平滑切换，合理分割脚手架工具与核心应用代码。


- 单一的配置文件：很多项目里面是把开发环境与生产环境写了两个配置文件，可能笔者比较懒吧，不喜欢这么做，因此笔者的第一个特性就是单一的配置文件，然后通过npm封装不同的编译命令传入环境变量，然后在配置文件中根据不同的环境变量进行动态响应。另外，要保证一个Boilerplate能够在最小修改的情况下应用到其他项目。

- 多应用入口支持：无论是单页应用还是多页应用，在Webpack中往往会把一个html文件作为一个入口。笔者在进行项目开发时，往往会需要面对多个入口，即多个HTML文件，然后这个HTML文件加载不同的JS或者CSS文件。譬如登录页面与主界面，往往可以视作两个不同的入口。Webpack原生提倡的配置方案是面向过程的，而笔者在这里是面向应用方式的封装配置。

- 调试时热加载：这个特性毋庸多言，不过热加载因为走得是中间服务器，同时只能支持监听一个项目，因此需要在多应用配置的情况下加上一个参数，即指定当前调试的应用。

- 自动化的Polyfill：这个是Webpack自带的一个特性吧，不过笔者就加以整合，主要是实现了对于ES6、React、CSS(Flexbox)等等的自动Polyfill。

- 资源文件的自动管理：这部分主要指从模板自动生成目标HTML文件、自动处理图片/字体等资源文件以及自动提取出CSS文件等。

- 文件分割与异步加载：可以将多个应用中的公共文件，譬如都引用了React类库的话，可以将这部分文件提取出来，这样前端可以减少一定的数据传输。另外的话还需要支持组件的异步加载，譬如用了React Router，那需要支持组件在需要时再加载。

# Quick Start

use `npm install` / `npm link` to set up environment

use `npm start` to start Develop Server:localhost:3000

use `npm run storybook` to start StoryBook UI

use `npm run build` to build the release version

use `npm run build:style-check` to check code style and build the release version

use `npm run deploy` to build and set up a simple http server for the dist directory


# Develop Environment:开发环境机制详解

## Webpack

## Hot Loader

## API Proxy

# React Router & Server Side Rendering

## Pure Frontend 

## SSR

与纯粹的前端项目相比,如果需要引入Server Side Rendering的支持,需要将本文的react_app.js这个入口文件替换为react_client.js,其核心代码变为了:

```
/**
 * Created by apple on 16/9/13.
 */
import React from 'react';
import { match, Router } from 'react-router';
import { render } from 'react-dom';
import { createHistory } from 'history';
import getRoutes from '../../react/routes';

const {pathname, search, hash} = window.location;
const location = `${pathname}${search}${hash}`;

// calling `match` is simply for side effects of
// loading route/component code for the initial location
match({routes: getRoutes(localStorage), location}, () => {
  render(
    <Router routes={getRoutes(localStorage)} history={createHistory()}/>,
    document.getElementById('app')
  )
});
```

而相对应的也需要添加react_server.js，其负责将

## Authentication

# Isomorphic Redux

## Pure Frontend 

## SSR