![](https://parg.co/U0a)

[中文版本](./) | [English Version](./README.en.md)

# fe-boilerplate

[fe-boilerplate](https://github.com/wxyyxc1992/fe-boilerplate) 是笔者对于日常工作中的基于 React/Vue.js 技术栈与实践的收集(\*部分模板修改自其他项目)与沉淀，dev-config/\* 与 package.json 构成了基础的脚手架，支持最新的开发流程与默认的生产环境优化。

为了方便不同级别/熟练程度的开发者使用，笔者将模板尽可能地泛化为多个项目，包含了从入门级到生产环境，微前端等多个不同层次/复杂度的模板项目。其中，模板特性可能包括或不限于以下：

- 技术栈支持：使用 ES6/ES7 语法、允许使用 CSS Modules、SCSS、Less(CSS Modules) 并且使用 PostCSS 进行自动 Polyfill、支持使用 styled-component 进行 CSS-in-JS 样式控制、使用 TypeScript 作为静态语言、使用 Jest 作为默认的测试框架；

- 开发环境：使用 WebpackDevServer 部署开发服务器、支持组件热加载、使用 TS/Babel 进行代码转换、使用 ESLint 进行代码检测、使用 DllPlugin 作为开发环境下公共代码提取工具以优化编译速度；

- 生产环境：使用 CommonChunksPlugin\*(Webpack 4 中提供了 optimization 选项) 作为生产环境下公共代码提取工具、使用 Prepack & prepack-webpack-plugin 进行代码优化、使用 offline-plugin 添加简单的 PWA 特性增强；

- 部署方式：支持独立部署(HashRouter)、支持服务端部署、支持服务端渲染；

---

# TOC | 目录索引

## [Micro Frontend](./micro-frontend) | 微前端架构

## [WebAssembly](./wasm)

## [Bundler](./bundler) | 前端构建工具

- [webpack](./builder/webpack)
- [parcel](./builder/parcel)
- [rollup](./builder/rollup)

## [Framework](./framework) | 前端框架

- [react](./framework/react): 基于 React 的前端项目

  - [webpack](./framework/react/webpack): 基于 Webpack 的生产环境项目模板
  - [webpack-ts](./framework/react/webpack-ts): 基于 Webpack & TypeScript 的生产环境项目模板
  - [parcel](./framework/react/parcel): 基于 Parcel 的应用模板
  - [parcel-ts](./framework/react/parcel-ts): 基于 Parcel & TypeScript 的应用模板
  - [jest](./framework/react/jest): 基于 Jest 的单元测试与组件测试
  - [rrv4](./framework/react/rrv4): React Router V4 应用详解
  - [graphql](./framework/react/graphql): GraphQL 客户端实例
  - [umd](./framework/react/umd): 可发布的 React 组件项目库模板

- [vue](./framework/vue): 基于 Vue.js 的前端项目

  - [webpack](./framework/vue/webpack)
  - [parcel](./framework/vue/parcel)

- [redux](./sm/redux): Redux 典型应用

- [mobx](./sm/mobx): MobX 典型应用

## [Mobile](./mobile) | 移动应用

- [rn](./mobile/rn): 基于 ReactNative 的移动跨平台项目

  - [webpack](./mobile/rn/webpack)
  - [webpack-ts](./mobile/rn/webpack-ts)

- [Weapp](./mobile/weapp): 微信小程序

  - [mpvue](./mobile/weapp/mpvue): 基于 mpvue 的小程序模板
  - [mobx](./mobile/weapp/mobx): MobX 模板

- [weex](./mobile/weex): 基于 Weex 的移动跨平台项目(WIP)

- [Fultter](./mobile/flutter)

## [Desktop](./desktop) | 桌面应用

- [electron](./electron): 基于 Electron 的跨平台项目

  - [react](./electron/react)
  - [vue](./electron/vue)

---

# 延伸阅读

- [现代 Web 开发，现代 Web 开发导论 | 基础篇 | 进阶篇 | 架构优化篇 | React 篇 | Vue 篇 ](https://github.com/wxyyxc1992/Web-Series)

- [现代 JavaScript 开发：语法基础与工程实践](https://github.com/wxyyxc1992/ProgrammingLanguage-Series/tree/master/JavaScript)

- [Awesome-CheatSheet/Web](https://github.com/wxyyxc1992/Awesome-CheatSheet)

# About

- 子项目命名方式：主体-子关键字 混合项目命名方式：框架-语言/机制-工具
