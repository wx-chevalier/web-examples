![](https://parg.co/U0a)

[中文版本](./) | [English Version](./README.en.md)

# fe-boilerplate

[fe-boilerplate](https://github.com/wxyyxc1992/fe-boilerplate) 是笔者对于日常工作中的基于 React/Vue.js 技术栈与实践的收集(部分模板修改自其他项目)与沉淀，`dev-config/` 与 package.json 构成了基础的脚手架，支持最新的开发流程与默认的生产环境优化。

为了方便不同级别/熟练程度的开发者使用，笔者将模板尽可能地泛化为多个项目，包含了从入门级到生产环境，微前端等多个不同层次/复杂度的模板项目。其中，模板特性可能包括或不限于以下：

- 技术栈支持：使用 ES6/ES7 语法、允许使用 CSS Modules、SCSS、Less(CSS Modules) 并且使用 PostCSS 进行自动 Polyfill、支持使用 styled-component 进行 CSS-in-JS 样式控制、使用 TypeScript 作为静态语言、使用 Jest 作为默认的测试框架；

- 开发环境：使用 WebpackDevServer 部署开发服务器、支持组件热加载、使用 TS/Babel 进行代码转换、使用 ESLint 进行代码检测、使用 DllPlugin 作为开发环境下公共代码提取工具以优化编译速度；

- 生产环境：使用 CommonChunksPlugin\*(Webpack 4 中提供了 optimization 选项) 作为生产环境下公共代码提取工具、使用 Prepack & prepack-webpack-plugin 进行代码优化、使用 offline-plugin 添加简单的 PWA 特性增强；

- 部署方式：支持独立部署(HashRouter)、支持服务端部署、支持服务端渲染；

---

鉴于项目包含的子项目较多，建议您是要 [GitZip](https://parg.co/QjH) 工具来便捷、独立下载所需的项目。

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


# Home & More | 延伸阅读

![](https://i.postimg.cc/59QVkFPq/image.png)

您可以通过以下导航来在 Gitbook 中阅读笔者的系列文章，涵盖了技术资料归纳、编程语言与理论、Web 与大前端、服务端开发与基础架构、云计算与大数据、数据科学与人工智能、产品设计等多个领域：

- 知识体系：《[Awesome Lists](https://ngte-al.gitbook.io/i/)》、《[Awesome CheatSheets](https://ngte-ac.gitbook.io/i/)》、《[Awesome Interviews](https://github.com/wx-chevalier/Awesome-Interviews)》、《[Awesome RoadMaps](https://github.com/wx-chevalier/Awesome-RoadMaps)》、《[Awesome MindMaps](https://github.com/wx-chevalier/Awesome-MindMaps)》、《[Awesome-CS-Books-Warehouse](https://github.com/wx-chevalier/Awesome-CS-Books-Warehouse)》

- 编程语言：《[编程语言理论](https://ngte-pl.gitbook.io/i/)》、《[Java 实战](https://ngte-pl.gitbook.io/i/java/java)》、《[JavaScript 实战](https://ngte-pl.gitbook.io/i/javascript/javascript)》、《[Go 实战](https://ngte-pl.gitbook.io/i/go/go)》、《[Python 实战](https://ngte-pl.gitbook.io/i/python/python)》、《[Rust 实战](https://ngte-pl.gitbook.io/i/rust/rust)》

- 软件工程、模式与架构：《[编程范式与设计模式](https://ngte-se.gitbook.io/i/)》、《[数据结构与算法](https://ngte-se.gitbook.io/i/)》、《[软件架构设计](https://ngte-se.gitbook.io/i/)》、《[整洁与重构](https://ngte-se.gitbook.io/i/)》、《[研发方式与工具](https://ngte-se.gitbook.io/i/)》

* Web 与大前端：《[现代 Web 开发基础与工程实践](https://ngte-web.gitbook.io/i/)》、《[数据可视化](https://ngte-fe.gitbook.io/i/)》、《[iOS](https://ngte-fe.gitbook.io/i/)》、《[Android](https://ngte-fe.gitbook.io/i/)》、《[混合开发与跨端应用](https://ngte-fe.gitbook.io/i/)》

* 服务端开发实践与工程架构：《[服务端基础](https://ngte-be.gitbook.io/i/)》、《[微服务与云原生](https://ngte-be.gitbook.io/i/)》、《[测试与高可用保障](https://ngte-be.gitbook.io/i/)》、《[DevOps](https://ngte-be.gitbook.io/i/)》、《[Node](https://ngte-be.gitbook.io/i/)》、《[Spring](https://ngte-be.gitbook.io/i/)》、《[信息安全与渗透测试](https://ngte-be.gitbook.io/i/)》

* 分布式基础架构：《[分布式系统](https://ngte-infras.gitbook.io/i/)》、《[分布式计算](https://ngte-infras.gitbook.io/i/)》、《[数据库](https://ngte-infras.gitbook.io/i/)》、《[网络](https://ngte-infras.gitbook.io/i/)》、《[虚拟化与编排](https://ngte-infras.gitbook.io/i/)》、《[云计算与大数据](https://ngte-infras.gitbook.io/i/)》、《[Linux 与操作系统](https://ngte-infras.gitbook.io/i/)》

* 数据科学，人工智能与深度学习：《[数理统计](https://ngte-aidl.gitbook.io/i/)》、《[数据分析](https://ngte-aidl.gitbook.io/i/)》、《[机器学习](https://ngte-aidl.gitbook.io/i/)》、《[深度学习](https://ngte-aidl.gitbook.io/i/)》、《[自然语言处理](https://ngte-aidl.gitbook.io/i/)》、《[工具与工程化](https://ngte-aidl.gitbook.io/i/)》、《[行业应用](https://ngte-aidl.gitbook.io/i/)》

* 产品设计与用户体验：《[产品设计](https://ngte-pd.gitbook.io/i/)》、《[交互体验](https://ngte-pd.gitbook.io/i/)》、《[项目管理](https://ngte-pd.gitbook.io/i/)》

* 行业应用：《[行业迷思](https://github.com/wx-chevalier/Business-Series)》、《[功能域](https://github.com/wx-chevalier/Business-Series)》、《[电子商务](https://github.com/wx-chevalier/Business-Series)》、《[智能制造](https://github.com/wx-chevalier/Business-Series)》

此外，前往 [xCompass](https://wx-chevalier.github.io/home/#/search) 交互式地检索、查找需要的文章/链接/书籍/课程；或者在在 [MATRIX 文章与代码索引矩阵](https://github.com/wx-chevalier/Developer-Zero-To-Mastery)中查看文章与项目源代码等更详细的目录导航信息。最后，你也可以关注微信公众号：『**某熊的技术之路**』以获取最新资讯。

# About

- 子项目命名方式：主体-子关键字 混合项目命名方式：框架-语言/机制-工具
