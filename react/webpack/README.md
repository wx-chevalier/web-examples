![](https://www.robinwieruch.de/img/posts/minimal-react-webpack-babel-setup/banner.jpg)

# React & Webpack Boilerplate V4

[React & Webpack Boilerplate V4](https://github.com/wxyyxc1992/fe-boilerplate/blob/master/react/webpack/README.md) 是笔者前端常用模板集锦项目 [fe-boilerplate](https://github.com/wxyyxc1992/fe-boilerplate) 的一部分，尽可能地使用无异议的工具，提供直观且简洁明了的方式；相较于 create-react-app，具有更好的可配置性与适应性，适合于中长期项目。支持最新的 Webpack 4 & React 16.3 版本，如果需要引入 TypeScript 支持，可以借鉴 [react/webpack-ts](https://github.com/wxyyxc1992/fe-boilerplate) 这个模板。

为了保证项目的纯粹性，将原本 React Router，Redux，MobX 等常见的技术框架的使用迁移到了 [fe-boilerplate](https://github.com/wxyyxc1992/fe-boilerplate) 的其他模板项目中。也可以查阅 [Webpack CheatSheet](https://github.com/wxyyxc1992/Awesome-CheatSheet/blob/master/Web/Builder/Webpack-CheatSheet.md)，或者 [React CheatSheet](https://github.com/wxyyxc1992/Awesome-CheatSheet/blob/master/Web/Framework/React-CheatSheet.md)、[现代 Web 开发基础与工程实践](https://github.com/wxyyxc1992/Web-Series) 了解更多 Web 开发实践的知识。

# 配置与使用

下载或者克隆 [fe-boilerplate](https://github.com/wxyyxc1992/fe-boilerplate)，并且进入 `react/webpack` 子目录：

```sh
# 安装依赖
$ cnpm install

# 仅启动 Web 开发服务器
$ npm run dev

# 启动 Web 开发服务器与 Mock 服务器
$ npm start

# 启动 Storybook 服务，在进行组件开发时使用
$ npm run storybook

# 编译为可发布的包体
$ npm run build

# 使用 *.umd.* 配置文件，编译为库
$ npm run build:lib

# 执行 ESLint
$ npm run lint

# 执行包体分析
$ npm run analyze
```

如果我们是进行的多页面应用开发，那么可以在 [webpack.config.base.js](./dev-config/webpack.config.base.js) 文件中添加更多的 Entry 与 [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin) 配置。

# 技术栈

* 样式

  * 支持使用 CSS Modules/SCSS/Less 等 CSS 模块化解决方案，对于潜在的类名过长导致的冗余包体等问题可以参考 [babel-plugin-jsx-nested-classname](https://parg.co/Yln)。
  * 示例代码使用了 [styled-components](https://github.com/styled-components/styled-components) 作为 CSS-in-JS 库。
  * 使用 PostCSS 作为 CSS 代码的后置 Polyfill 以及语法转换支持，详见 [postcss.config.js](./postcss.config.js) 中的配置。

* 约束

  * 使用 [Prettier](https://github.com/prettier/prettier) 作为代码格式化工具。
  * 强烈建议使用 ESLint 进行代码风格控制，可以使用 [vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 插件以获得更好的开发体验；ESLint 规则推荐使用 [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)。
  * 可以使用 [vscode-import-formatter](https://github.com/MagicCube/vscode-import-formatter) 等格式化工具处理代码的细节风格，譬如引用顺序等问题。

- 测试

  * 使用 [Jest](https://facebook.github.io/jest/) 作为 Test Runner 以及单元测试框架。
  * 使用 [Enzyme](https://github.com/airbnb/enzyme) 作为 React 组件的测试框架。

- 计算
  * 使用 [workerize-loader](https://github.com/developit/workerize-loader) 提供便捷的 Web Worker 计算支撑，可以参考 [DOM CheatSheet](https://parg.co/YlB) 获取更多内容。

# 开发态特性

* 热加载

  * 使用内建的 [Webpack DevServer](https://webpack.js.org/configuration/dev-server/) 作为开发服务器。
  * 使用 [React Hot Loader V4](https://github.com/gaearon/react-hot-loader) 提供 React 组件热加载的能力。

* 构建优化

  * 使用 DllPlugin 作为开发环境下公共代码提取工具以优化编译速度生产环境。
  * 可以考虑使用 [HappyPack](https://github.com/amireh/happypack), [parallel-webpack](https://github.com/trivago/parallel-webpack) 等工具提升 Webpack 的并行处理能力。

# 发布态特性

* 代码分割，Webpack 4 移除了 CommonChunksPlugin，替换以 optimization 与 splitChunks 配置项，详细配置参考 [webpack.config.prod.js](./dev-config/webpack.config.prod.js)。

* PWA 特性，使用 [offline-plugin](https://github.com/NekR/offline-plugin) 添加便捷的 PWA 支持。

* 服务端渲染，详见 [ssr/server](./ssr/server.js)。

* 代码优化，使用 Prepack & prepack-webpack-plugin 进行代码优化。
