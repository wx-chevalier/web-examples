

> [基于 Webpack 3 的 React 工程项目脚手架](https://github.com/wxyyxc1992/create-react-boilerplate)从属于笔者的[  Web 前端入门与工程实践](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices)，算来已经是笔者 React 技术栈脚手架的第四个迭代版本。更多关于 React 或者前端开发相关的资料链接可以参考[React 学习与实践资料索引](https://parg.co/bM1)以及[ Webpack 学习与资料索引](https://parg.co/bVs)，对于其中浅薄的工程化的思考可以参考[ 2016-我的前端之路:工具化与工程化](https://zhuanlan.zhihu.com/p/24575395)。

![](https://www.robinwieruch.de/img/posts/minimal-react-webpack-babel-setup/banner.jpg)

# 基于 Webpack 3 的 React 工程项目脚手架


[ create-react-boilerplate ](https://github.com/wxyyxc1992/create-react-boilerplate)是笔者对于日常工作中的基于 React 技术栈与实践的沉淀，dev-config/* 与 package.json 构成了基础的脚手架，支持最新的开发流程与默认的生产环境优化；模板项目包含特性如下：

- 技术栈支持：使用 ES6/ES7 语法、使用 React Router V4、允许使用 CSS Modules、SCSS、Less 并且使用 PostCSS 进行自动 Polyfill、支持使用 styled-component 进行 CSS-in-JS 样式控制、使用 Flow 作为静态类型检测工具、使用 Jest 作为默认的测试框架
- 开发环境：使用 WebpackDevServer 部署开发服务器、使用 React Hot Loader 进行组件热加载、使用 Babel 进行代码转换、使用 ESLint 进行代码检测、使用 DllPlugin 作为开发环境下公共代码提取工具以优化编译速度
- 生产环境：使用 CommonChunksPlugin 作为生产环境下公共代码提取工具、使用 Prepack & prepack-webpack-plugin 进行代码优化、使用 offline-plugin 添加简单的 PWA 特性增强
- 部署方式：支持独立部署（Hash 方式切换路由）、支持服务端部署、支持服务端渲染


我们可以直接拷贝该项目来展示部分开发模式或者作为模板项目使用：

```bash
# 下载本项目
git clone https://github.com/wxyyxc1992/create-react-boilerplate

# 可以使用 yarn install & npm start 直接运行本项目
# 仅保留 dev-config、package.json、src/client.js、src/ssr_server.js
mkdir /path/to/your/project

# 拷贝必须的启动文件
cp -r dev-config/ /path/to/your/project
cp package.json /path/to/your/project
cp src/client.js /path/to/your/project/src/
cp src/ssr_server.js /path/to/your/project/src/

# 安装运行依赖
cd /path/to/your/project

yarn install / npm install

# 启动项目
npm start

# 编译为纯客户端部署模式，即单个 HTML 页面
npm run build

# 编译为服务端渲染模式（主要区别在于路由支持）
npm run build:ssr

# 进行依赖升级检查
npm run update

# 启动 Storybook
npm run storybook
```

此外本项目中的演示代码还包含了性能优化、设计模式、样式指南、Redux、MobX 等常见的开发模式，在线演示地址：[http://wxyyxc1992.github.io/crb/](http://wxyyxc1992.github.io/crb/)；目前演示代码还处于完善阶段，可以关注[代码仓库](https://github.com/wxyyxc1992/create-react-boilerplate)了解最新更新：

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

未来笔者也会同步升级 `create-react-boilerplate` 命令行工具以快速创建项目；此外本文档仅是对于项目中使用的 Webpack 配置进行说明，详细的 Webpack 学习资料可以参考笔者在[ React 与前端工程化实践](https://parg.co/bIn)一书中的 React 初窥与 Webpack 工程实战两章。


# 基础配置

create-react-boilerplate 默认的应用配置位于 dev-config/apps.config.js 文件中，该文件也是 dev-config/ 文件夹下唯一与应用业务相关的文件；该文件定义了不同应用中的需要配置的应用相关信息。create-react-boilerplate 定位为单项目多应用的模板，因此我们可以在`apps` 键下配置项目设计的应用入口；在打包时会自动将多个应用并行编译并且提取出所有公共的代码。每个应用需要提供唯一编号、入口文件地址、模板页面、是否编译等信息；接下来 devServer 则是定义了当前正在开发的应用入口，ssrServer 定义了打包时需要使用的渲染服务器入口，其会在执行 `npm run build:ssr` 时调用，`proxy` 与 `api` 则定义了后端服务器信息，开发者可以根据业务需求自行使用。典型的 apps.config.js 文件配置如下：

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
这里还需要提及的是在 *client.js 入口文件中，我们还需要引入封装之后的渲染方法以支持热加载，其模板为：
```
// @flow

import React from "react";
import App from "./container/App";
import { clientRender } from "../dev-config/tool/render";

//将组件渲染到DOM中
clientRender(<App />, document.getElementById("root"), "./container/App", true);

```

## 脚本编译与热加载

在 dev-config/webpack/loaders.js 文件中定义了模板所需要的加载器，默认支持 js、jsx、ts、tsx、css、scss、less、json 以及各种资源文件等常见格式。当我们执行 `npm start` 命令时，会自动启动dev-config/server/devServer.js 文件中定义的 Webpack 开发服务器，该服务器会使用 dev-config/webpack.config.js 文件进行配置项生成。值得一提的是，WebpackDevServer 中的 contentBase 设置为了 `path.join(__dirname, "../../public")`，也就是将 /public 目录作为开发服务器的默认根目录。create-react-boilerplate 默认使用 [react-hot-loader](https://github.com/gaearon/react-hot-loader) 添加 React 热加载支持，其配置包括以下步骤：
- 开发时应用入口设置：
```
  entry = [
    "react-hot-loader/patch",
    `webpack-dev-server/client?http://0.0.0.0:${appsConfig.devServer.port}`,
    "webpack/hot/only-dev-server",
    require("./apps.config.js").devServer.appEntrySrc
  ];
```
- Babel 配置，默认的 Babel 文件位于 dev-config/tool/.babelrc：
```
  ...
  "plugins": [
    "react-hot-loader/babel",
  ...
```
- React Hot Loader 3 并未实现模块热替换接口，因此我们还需要重载自定义的渲染方法，参考 dev-config/tool/render.js 文件中的实现：
```
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './containers/App'

ReactDOM.render(
  <AppContainer>
    <App/>
  </AppContainer>,
  document.getElementById('root')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
```

## 样式处理

create-react-boilerplate 支持 SCSS、CSS Modules 以及 styled-components 这三种样式定义方式，鉴于默认是将所有的 *.css 文件按照 CSS Modules 方式载入；因此如果想不使用 CSS Modules 来声明样式，即使不使用 SCSS 语法也需要将样式文件后缀声明为 *.scss。
- SCSS 
```scss
// 声明
.Showcase__container {

  height: 100%;
  ...

  // 左侧导航栏
  .Showcase__navigator {
    flex: 240px 0 0;
    ...
  }

  // 右侧展示区域
  .Showcase__cases {
    flex: 80% 1 1;

    padding: 5px 10px;
  }
}

// 引入
import "./Showcase.scss";
```

- styled-components
```
import styled from "styled-components";

const ShowcaseHeaderContainer = styled.section`
  padding:1% 2%;
  margin-bottom:1%;
  background:white;
  color:rgba(0, 0, 0, 0.65);
  
  border-bottom:1px solid #e9e9e9;
  
`;

const ShowcaseHeaderTitle = styled.h1`
  color:rgba(0, 0, 0, 0.65);
`;

const ShowcaseHeaderDescription = styled.h2`
  color:rgba(0, 0, 0, 0.65);
`;
```

- CSS Modules
```
// 正常声明
.tip{
    font-size: 20px;
}

// 使用
import styles from "./Private.css";
...
<span className={styles.tip} />
```

在开发环境下样式会被 style-loader 以内联样式导入，而生产环境下则会通过 ExtractTextPlugin 抽取为单独的 CSS 文件。

```javascript
exports.styles = {
  css: {
    test: /\.css$/,
    use: __DEV__
      ? ["style-loader", moduleCSSLoader, postCSSLoader]
      : ExtractTextPlugin.extract({
          use: [moduleCSSLoader, postCSSLoader]
        })
  },
  scss: {
    test: /\.(scss|sass)$/,
    use: __DEV__
      ? ["style-loader", "css-loader", postCSSLoader, "sass-loader"]
      : ExtractTextPlugin.extract({
          use: ["css-loader", postCSSLoader, "sass-loader"]
        })
  },
  less: {
    test: /\.(less)$/,
    use: __DEV__
      ? ["style-loader", "css-loader", postCSSLoader, "less-loader"]
      : ExtractTextPlugin.extract({
          use: ["css-loader", postCSSLoader, "less-loader"]
        })
  }
};
```

# Webpack 性能优化

## 公共代码分割

create-react-boilerplate 使用了 CommonsChunkPlugin 进行代码分割，默认在 dev-config/webpack/plugins.js 文件中定义了对于 node_modules 中依赖文件的自动抽取：

```
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: "vendor.bundle.js",
    minChunks: ({ resource }) =>
      resource &&
      resource.indexOf("node_modules") >= 0 &&
      resource.match(/\.(js|less|scss)$/)
  })
```

该插件会自动生成 vendor.bundle.js 文件，我们需要在应用入口文件之前引用它；开发者也可以自定义 CommonsChunkPlugin 插件以自定义需要提取的公共代码。

## 构建性能优化

随着项目复杂度与体量的增加，我们发现初始化编译与增量编译的速度都有所下降，为了提升构建性能首先我们要做的就是保持 Webpack 版本的更新速度；此外，create-react-boilerplate 还默认启动了 DllPlugin 在开发状态下将所有的依赖提取为 dll 文件以提高增量编译的速度。因为考虑到灵活性，即随时有可能增减依赖的情况，create-react-boilerplate 目前设置的是每次使用 `npm start` 的时候都会重新生成 dll 文件；如果是已经稳定的项目可以考虑仅生成一次依赖。

```
const path = require("path");
const pkg = require("../package.json");
const webpack = require("webpack");

let dllConfig = {
  name: "vendor",
  entry: Object.keys(pkg.dependencies),
  output: {
    path: path.resolve(__dirname, "../public/dll"),
    filename: "vendor.bundle.js",
    library: "vendor_[hash]"
  },
  plugins: [
    new webpack.DllPlugin({
      name: "vendor_[hash]",
      path: path.resolve(__dirname, "../public/dll/manifest.json")
    })
  ]
};

module.exports = dllConfig;

// 在 public/index.html 文件中需要引入该依赖
// index.html
<script src="dll/vendor.bundle.js"></script>
```

## 代码编译优化

create-react-boilerplate 中也内置了其他的编译之后的代码性能优化插件，首先是利用 Webpack 3 的 Scope Hositing 特性来优化生成的模块；这一点需要使用 ModuleConcatenationPlugin 插件。此外，还使用了 PrepackWebpackPlugin 对于打包生成的文件进行过滤与重构；不过需要注意的是 PrepackWebpackPlugin 会较大地降低编译速度，因此也是可以根据实际的项目情况选用。

```
  // 使用 Scope Hositing 特性
  new webpack.optimize.ModuleConcatenationPlugin(),

  // 使用 Prepack 优化包体大小
  // 暂时存在 Bug,等待修复
  // 使用前 21 - 425
  // 使用后 21 - 433
  new PrepackWebpackPlugin({
    mathRandomSeed: "0"
  }),
```

## PWA

create-react-boilerplate 中只是简单地使用了 [Offline Plugin](https://github.com/NekR/offline-plugin)，其配置如下：
```
// webpack.config.js example

var OfflinePlugin = require('offline-plugin');

module.exports = {
  // ...

  plugins: [
    // ... other plugins
    // it's always better if OfflinePlugin is the last plugin added
    new OfflinePlugin()
  ]
  // ...
}

// render.js
require('offline-plugin/runtime').install();
```

观察网络面板中的资源请求情况，我们可以看到脚本等已经被缓存在了本地：

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/3/2/QQ20170518-093821.png)


# 设计模式

## 组件异步加载

在 create-react-boilerplate 中使用了 [react-loadable](https://github.com/thejameskyle/react-loadable) 进行组件异步分割与加载，参考 src/case/performance/lazy/Lazy.js 文件了解完整实现。我们首先通过 Loadable 封装需要异步加载的组件：
```
export const LoadableLazyComponent = Loadable({
  loader: () => import("./LazyComponent"),
  loading: LoadingPlaceholder,
  delay: 200
  // serverSideRequirePath: path.join(__dirname, "./LazyComponent"),
  // webpackRequireWeakId: () => require.resolveWeak("./LazyComponent")
});
```
然后引入封装组件 `import { LoadableLazyComponent } from "./loadable/LoadableLazyComponent";` 如常使用即可。

## 服务端渲染

create-react-boilerplate 目前展示了基础的基于 React Router V4 的服务端渲染支持：

```
// AppContainer.js
const Router = __SSR__ ? BrowserRouter : HashRouter;


// ssrServer.js
//处理所有的请求地址
app.get('/*', function(req, res) {
  try {
    // 判断页面是否匹配
    const match = routes.reduce((acc, route) => {
      return matchPath(req.url, { path: route, exact: true }) || acc;
    }, false);

    // 如果待寻找页面不存在
    // 仅当访问 404 界面时，提示不存在
    if (match) {
      res.status(404).send(renderToString(<NoMatch location={req.url} />));
      return;
    }

    // 存放渲染之后的 Context 数据
    let context = {};

    // 将组件渲染为 HTML
    let markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App serverSideMessage={'Hello World By Server Side Rendering'} />
      </StaticRouter>
    );

    // 判断是否存在转发
    if (context.url) {
      res.writeHead(301, {
        Location: context.url
      });
      res.end();
    } else {
      res
        .status(200)
        .send(
          renderHTML(
            markup,
            { key: 'value' },
            ['/static/vendor.bundle.js', '/static/index.bundle.js'],
            ['/static/index.css']
          )
        );
      res.end();
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});
```

如果需要进行数据预抓取，可以考虑将数据挂载到页面上进行传递。

## 代码风格

详细的 JavaScript 编程样式指南已经迁移到了[ Web 项目开发风格指南](https://parg.co/bIX)与[ JavaScript 编程样式指南](https://parg.co/bvM)，涵盖了基本原则阐述、代码风格、代码格式化与语法检测、项目架构等几个部分。不过本部分建议是类似于 Create React APP 配置提交时自动进行格式化，首先需要安装如下依赖：
```
npm install --save husky lint-staged prettier
// or
yarn add husky lint-staged prettier
```
然后在 package.json 中添加 Hook：
```
  "scripts": {
    "precommit": "lint-staged",
    ...
```
同时添加 lint-staged 配置：
```
  "dependencies": {
    // ...
  },
+ "lint-staged": {
+   "{src,stories}/**/*.{js,jsx,json,css}": [
+     "prettier --single-quote --write",
+     "git add"
+   ]
+ },
  "scripts": {
```
这样当我们提交代码时就会自动使用 Prettier 优化代码，不过需要注意的是这种配置仅作用于根目录下；如果某个仓库中包含了多个应用配置，那么我们还需要在根目录下单独配置脚本。我们也可以使用 ```./node_modules/.bin/prettier --single-quote --write "src/**/*.{js,jsx}"``` 来手动进行项目文件的格式化。

# About 

## Related Project

目前基于本脚手架构建的开源项目有：

- [react-antd-mobx-admin](https://parg.co/btu): 基于 React Router V4、AntD、MobX 的后端管理模板

- [declarative-crawler-ui](https://github.com/wxyyxc1992/declarative-crawler/): 爬虫的配套监控框架

## Opninated Plugin

鉴于项目配置所限，还有部分插件为纳入进来，具体使用者可根据自己所处项目的特点选择性使用：
- [bundlesize](https://github.com/siddharthkp/bundlesize): Keep your bundle size in check


## RoadMap

- 升级到 React 16.0.0

## Contributions

欢迎提出 Issue。