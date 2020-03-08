![](https://s2.ax1x.com/2019/09/03/nANfVH.png)

[中文版本](./) | [English Version](./README.en.md)

# fe-boilerplate

[fe-boilerplate](https://github.com/wxyyxc1992/fe-boilerplate) 是笔者对于日常工作中的基于 React/Vue.js 技术栈与实践的收集(部分模板修改自其他项目)与沉淀，`dev-config/` 与 package.json 构成了基础的脚手架，支持最新的开发流程与默认的生产环境优化。

为了方便不同级别/熟练程度的开发者使用，笔者将模板尽可能地泛化为多个项目，包含了从入门级到生产环境，微前端等多个不同层次/复杂度的模板项目。其中，模板特性可能包括或不限于以下：

- 技术栈支持：使用 ES6/ES7 语法、允许使用 CSS Modules、SCSS、Less(CSS Modules) 并且使用 PostCSS 进行自动 Polyfill、支持使用 styled-component 进行 CSS-in-JS 样式控制、使用 TypeScript 作为静态语言、使用 Jest 作为默认的测试框架；

- 开发环境：使用 WebpackDevServer 部署开发服务器、支持组件热加载、使用 TS/Babel 进行代码转换、使用 ESLint 进行代码检测、使用 DllPlugin 作为开发环境下公共代码提取工具以优化编译速度；

- 生产环境：使用 CommonChunksPlugin\*(Webpack 4 中提供了 optimization 选项) 作为生产环境下公共代码提取工具、使用 Prepack & prepack-webpack-plugin 进行代码优化、使用 offline-plugin 添加简单的 PWA 特性增强；

- 部署方式：支持独立部署(HashRouter)、支持服务端部署、支持服务端渲染；

# TOC | 目录索引

## 项目索引

- Bundler 前端构建工具：[Webpack](./webpack), [Parcel](./webpack), [Rollup](./rollup)。

- Web 框架：[React](./react), [Vue](./vue)

- 跨端框架：[Electron](./electron)

## 关联项目

- [react-snippets](https://github.com/wx-chevalier/react-snippets): React Snippets(.ts/.tsx), about design patterns/techniques used while developing with React and TypeScript.  

- [vue-snippets](https://github.com/wx-chevalier/vue-snippets): Vue Snippets(.js/.ts), about design patterns/techniques used while developing with Vue and JavaScript/TypeScript.  

- [m-fe-husky-config](https://github.com/wx-chevalier/m-fe-configs)：Common Dev Configs(ESLint, Prettier, Husky, etc.) for Micro-Frontend Apps

- [m-fe-rtw](https://github.com/wx-chevalier/m-fe-rtw): Micro-Frontend boilerplate with React & TypeScript & Webpack, for complicated cooperative applications. | 微前端项目模板

- [m-fe-vtw](https://github.com/wx-chevalier/m-fe-vtw): Micro-Frontend boilerplate with Vue & TypeScript & Webpack, for complicated cooperative applications. | 微前端项目模板

- [fractal-components](https://github.com/wx-chevalier/fractal-components): Massive Fractal Components in Several Libraries(Vanilla, React, Vue, Weapp), for building your great apps easily again

- [Legoble](https://github.com/wx-chevalier/Legoble): Build your apps like stacking Lego blocks 💫总想自己实现一款可视化配置的动态应用构建工具，动态表单、动态布局、动态报告、动态规则、动态选择、动态流程

# About

- 子项目命名方式：主体-子关键字 混合项目命名方式：框架-语言/机制-工具

## Copyright & More | 延伸阅读

笔者所有文章遵循 [知识共享 署名-非商业性使用-禁止演绎 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh)，欢迎转载，尊重版权。您还可以前往 [NGTE Books](https://ng-tech.icu/books/) 主页浏览包含知识体系、编程语言、软件工程、模式与架构、Web 与大前端、服务端开发实践与工程架构、分布式基础架构、人工智能与深度学习、产品运营与创业等多类目的书籍列表：

![NGTE Books](https://s2.ax1x.com/2020/01/18/19uXtI.png)


