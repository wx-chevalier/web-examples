# fe-boilerplate: Boilerplates for Web Development, with React/Vue.js, Webpack/Parcel, TypeScript, Electron, etc.

[fe-boilerplate](https://github.com/wxyyxc1992/fe-boilerplate) 是笔者对于日常工作中的基于 React/Vue.js 技术栈与实践的沉淀，dev-config/\* 与 package.json 构成了基础的脚手架，支持最新的开发流程与默认的生产环境优化。

为了方便不同级别/熟练程度的开发者使用，笔者将模板尽可能地泛化为多个项目，包含了从入门级到生产环境等多个不同层次/复杂度的模板项目。其中，模板特性可能包括或不限于以下：

* 技术栈支持：使用 ES6/ES7 语法、允许使用 CSS Modules、SCSS、Less 并且使用 PostCSS 进行自动 Polyfill、支持使用 styled-component 进行 CSS-in-JS 样式控制、使用 Flow 作为静态类型检测工具、使用 Jest 作为默认的测试框架；
* 开发环境：使用 WebpackDevServer 部署开发服务器、支持组件热加载、使用 Babel 进行代码转换、使用 ESLint 进行代码检测、使用 DllPlugin 作为开发环境下公共代码提取工具以优化编译速度；
* 生产环境：使用 CommonChunksPlugin 作为生产环境下公共代码提取工具、使用 Prepack & prepack-webpack-plugin 进行代码优化、使用 offline-plugin 添加简单的 PWA 特性增强；
* 部署方式：支持独立部署（Hash 方式切换路由）、支持服务端部署、支持服务端渲染；

# 索引

* React: 基于 React 的前端项目
  * [webpack]()
