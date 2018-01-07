# webpack-app-template

[ create-webpack-app ](https://github.com/wxyyxc1992/create-webpack-app)是笔者对于日常工作中的基于 React/Vue.js 技术栈与实践的沉淀，dev-config/\* 与 package.json 构成了基础的脚手架，支持最新的开发流程与默认的生产环境优化；模板项目包含特性如下：

* 技术栈支持：使用 ES6/ES7 语法、允许使用 CSS Modules、SCSS、Less 并且使用 PostCSS 进行自动 Polyfill、支持使用 styled-component 进行 CSS-in-JS 样式控制、使用 Flow 作为静态类型检测工具、使用 Jest 作为默认的测试框架；
* 开发环境：使用 WebpackDevServer 部署开发服务器、支持组件热加载、使用 Babel 进行代码转换、使用 ESLint 进行代码检测、使用 DllPlugin 作为开发环境下公共代码提取工具以优化编译速度；
* 生产环境：使用 CommonChunksPlugin 作为生产环境下公共代码提取工具、使用 Prepack & prepack-webpack-plugin 进行代码优化、使用 offline-plugin 添加简单的 PWA 特性增强；
* 部署方式：支持独立部署（Hash 方式切换路由）、支持服务端部署、支持服务端渲染；

作为前端构建工具，Webpack 极大地简化了项目的打包与部署流程，并且丰富地插件系统能够自动地帮我们进行代码处理与优化，是前端现代化与工程化地重要助力；更多 Webpack 相关资料参考[ Webpack 学习与资料索引](https://parg.co/bVs)。本项目针对不同的应用层框架分为以下模板：

* [基于 Webpack 3 的 React 工程项目脚手架](https://github.com/wxyyxc1992/create-webpack-app/tree/master/react)，更多 React 相关资料参考[ React 学习与实践资料索引](https://parg.co/bM1)以及[ React 与前端工程化实践](https://parg.co/bIn)系列文章。
* [基于 Webpack 3 的 Vue.js 工程项目脚手架](https://github.com/wxyyxc1992/create-webpack-app/tree/master/vue)，更多 Vue.js 相关资料参考[ Vue.js 学习与实践资料索引](https://parg.co/byL)以及[ Vue.js 与前端工程化实践](https://parg.co/bau)系列文章。

webpack-app-template 承担起除了 React、Vue.js 项目之外的 Webpack 项目孵化器的作用
