**本项目正在重构中，如果需要运行请直接 git clone & yarn install & npm start  运行开发环境，使用 npm run build:ssr & node dist/ssr_server.bundle.js 编译服务端渲染运行。或者参考在线地址：http://wxyyxc1992.github.io/crb/**


> [现代 Webpack 前端工程项目脚手架]()从属于笔者的[  Web 前端入门与工程实践](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices)，算来已经是笔者 React 技术栈脚手架的第四个迭代版本。更多关于 React 或者前端开发相关的资料链接可以参考[React 学习与实践资料索引](https://parg.co/bM1)与[]()。


# 现代 Webpack 前端工程项目脚手架

create-react-boilerplate 是笔者对于日常工作中的基于 React 技术栈与实践的沉淀，dev-config/* 与 package.json 构成了基础的脚手架，支持最新的开发流程与默认的生产环境优化。此外本项目中的演示代码还包含了性能优化、设计模式、样式指南、Redux、MobX 等常见的开发模式。

- 性能优化

    - 懒加载：
        
        - 组件的异步加载：src/case/performance/lazy/loadable
        
        - 外部依赖脚本（JS / CSS）的异步加载：src/case/performance/lazy/external/*
        
    - WebAssembly：[WebAssembly 初体验：重构计算模块](https://zhuanlan.zhihu.com/p/27410280)
    
        - 简单计数器：src/case/performance/web_assembly/counter
        
        - WayOfLife 游戏引擎：src/case/performance/web_assembly/game

- 设计模式

    - 权限校验：
        
        - 基于 React-Router-V4 的登录与权限控制验证：src/case/designpattern/auth

- 样式指南

- Redux

- MobX
    
    - TODOApp

## Features

- 技术栈支持：使用 ES6/ES7 语法、允许使用 SCSS 并且使用 PostCSS 进行自动 Polyfill、使用 Flow 作为静态类型检测工具、使用 Jest 作为默认的测试框架
- 开发环境：使用 WebpackDevServer 部署开发服务器、使用 React Hot Loader 进行组件热加载、使用 Babel 进行代码转换、使用 ESLint 进行代码检测、使用 DllPlugin 作为开发环境下公共代码提取工具以优化编译速度
- 生产环境：使用 CommonChunksPlugin 作为生产环境下公共代码提取工具、使用 Prepack & prepack-webpack-plugin 进行代码优化、使用 offline-plugin 添加简单的 PWA 特性增强
- 部署方式：支持独立部署（Hash 方式切换路由）、支持服务端部署、支持服务端渲染

```javascript

module.exports = {
  //基本的应用配置信息
  apps: [
    //HelloWorld
    {
      id: "pwa",
      src: "./pwa/client.js",
      indexPage: defaultIndexPage,
      compiled: true
    }
  ],

  //开发入口配置
  devServer: {
    appEntrySrc: "./pwa/client.js", //当前待调试的APP的入口文件
    port: 3000 //监听的Server端口
  },

  //用于服务端渲染的Server路径
  ssrServer: {
    serverEntrySrc: "./pwa/ssr_server.js"
  },

  //依赖项配置
  proxy: {
    //后端服务器地址 http://your.backend/
    "/api/*": "http://localhost:3001"
  },

  //后端 api 配置，这样配置可以避免将测试服务器端口暴露出去
  api: {
    dev: {},
    prod: {}
  }
};

```
## Applications

基于本脚手架构建的项目有：

- [react-antd-mobx-admin](https://parg.co/btu): 基于 React Router V4、AntD、MobX 的后端管理模板

- [declarative-crawler-ui](https://github.com/wxyyxc1992/declarative-crawler/tree/master/ui): 爬虫的配套监控框架


# 服务端渲染

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/3/2/QQ20170518-093821.png)
