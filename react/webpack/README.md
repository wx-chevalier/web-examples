![](https://www.robinwieruch.de/img/posts/minimal-react-webpack-babel-setup/banner.jpg)

# React & Webpack Boilerplate

尽可能地使用无异议的工具，提供直观且简洁明了的方式；相较于 create-react-app，具有更好的可配置性与适应性，适合于中长期项目。支持最新的 Webpack 4 & React 16.3 版本，如果需要引入 TypeScript 支持，可以借鉴 [react/webpack-ts](https://github.com/wxyyxc1992/fe-boilerplate) 这个模板。

为了保证项目的纯粹性，将原本 React Router，Redux，MobX，也可以查阅 [Webpack CheatSheet]()，或者 []()、[]() 了解更多 Web 开发实践的知识。

# 配置与使用

下载或者克隆 [fe-boilerplate](https://github.com/wxyyxc1992/fe-boilerplate)，并且进入 `react/webpack` 子目录：

```sh
$ cnpm install

$ npm run dev

$ npm start
```

如果我们是进行的多页面应用开发，那么可以在 webpack.config.base.js 文件中添加更多的 Entry 与 [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)

技术栈支持：使用 ES6/ES7 语法、使用 React Router V4、允许使用 CSS Modules、SCSS、Less 并且使用 PostCSS 进行自动 Polyfill、支持使用 styled-component 进行 CSS-in-JS 样式控制、使用 Flow 作为静态类型检测工具、使用 Jest 作为默认的测试框架开发环境：使用 WebpackDevServer 部署开发服务器、使用 React Hot Loader 进行组件热加载、使用 Babel 进行代码转换、使用 ESLint 进行代码检测、使用 DllPlugin 作为开发环境下公共代码提取工具以优化编译速度生产环境：使用 Prepack & prepack-webpack-plugin 进行代码优化、使用 offline-plugin 添加简单的 PWA 特性增强部署方式：支持独立部署（Hash 方式切换路由）、支持服务端部署、支持服务端渲染

# 技术栈

[vscode-import-formatter](https://github.com/MagicCube/vscode-import-formatter)

* 样式

* 约束

* 测试

# 开发态特性

# 发布态特性

* Webpack 4 移除了

[offline-plugin](https://github.com/NekR/offline-plugin)

服务端渲染

\*
