[中文版本](./) | [English Version](./README-en.md)

# m-fe/react-ts-webpack

在 [Web 开发导论/微前端与大前端](https://github.com/wxyyxc1992/Web-Series/blob/master/%E5%AF%BC%E8%AE%BA/%E5%BE%AE%E5%89%8D%E7%AB%AF%E4%B8%8E%E5%A4%A7%E5%89%8D%E7%AB%AF.md)一文中，笔者简述了微服务与微前端的设计理念以及微前端的潜在可行方案。微服务与微前端，都是希望将某个单一的单体应用，转化为多个可以独立运行、独立开发、独立部署、独立维护的服务或者应用的聚合，从而满足业务快速变化及分布式多团队并行开发的需求。如康威定律(Conway’s Law)所言，设计系统的组织，其产生的设计和架构等价于组织间的沟通结构；微服务与微前端不仅仅是技术架构的变化，还包含了组织方式、沟通方式的变化。微服务与微前端原理和软件工程，面向对象设计中的原理同样相通，都是遵循单一职责(Single Responsibility)、关注分离(Separation of Concerns)、模块化(Modularity)与分而治之(Divide & Conquer)等基本的原则。

![](https://user-images.githubusercontent.com/5803001/44003230-de68ac5c-9e81-11e8-81f5-8092f7a9b421.png)

[fe-boilerplates](https://github.com/wxyyxc1992/fe-boilerplate) 是笔者的前端项目模板集锦，包含了单模块单页面、单模块多页面、(伪)多模块单页面、微前端项目等不同类型的模板，其中[微前端项目模块 m-fe/react-ts-webpack](https://parg.co/rdc) 与前者的区别即在于微前端中的各个模块能够独立开发，独立版本发布，独立部署，独立加载。分布式协作势必会带来协同以及开发流程上的挑战，在设计微前端项目架构的时候开发易用性也是非常重要的考量点。在[年度总结](https://github.com/wxyyxc1992/Developer-Zero-To-Mastery/tree/master/TechRoad/2018)中我也讨论了使用 TS 面向重构编程的意义，欢迎参考 [Backend-Boilerplates/node](https://github.com/wxyyxc1992/Backend-Boilerplates) 中的 `ts-*` 项目，使用 TS 进行全栈开发。

当我们考量项目框架、模板或者脚手架的时候，首先想到的点就是希望尽可能对上层屏蔽细节，但是对于长期维护的、多人协作的中大型项目而言，如果项目的主导者直接使用了部分抽象的脚手架，不免会给未来的更新、迭代带来一定的技术负债；同时，目前也有很多成熟的工程化脚手架，因此笔者选择以项目模板的形式抽象出微前端中所需要的部分。尽可能地遵循简约、直观的原则，减少抽象/Magic Function 等；大型项目可能会抽象出专用的开发工具流，但是对于大部分项目而言，在现有框架/工具链的基础上进行适当封装会是较优选择。

```sh
# 拉取并且提取出子项目
git clone https://github.com/wxyyxc1992/fe-boilerplate
cp fe-boilerplate/micro-frontend/react-ts-webpack ../

# 添加全局的依赖更新工具
$ yarn global add npm-check-updates

# 为各个子项目安装依赖，以及链接各个子项目
$ npm run bootstrap && npm run build

# 执行预编译操作
$ npm run build

# 以基础模式运行 Host APP，此时 Host APP 作为独立应用启动
$ cd packages/rtw-host-app & npm run dev:sa

# 以标准模式运行子应用
$ cd packages/rtw-mobx-app & npm run dev

# 返回根目录
$ cd .. & npm start
```

值得说明的是，微前端作为概念对于不同人承载了不同的考量，其实现方式、落地路径也是见仁见智，若有不妥，敬请指教。

## Features

- 非 APP 类可单独发布，APP 类可单独运行，与发布。发布版本可包含 ES, CJS, UMD 等，dist 目录下包含 ES/CJS 模块，build 目录下包含 APP 完整资源以及 UMD 模块。
- 版本控制: 子应用资源不使用 Hash 方式，而是使用语义化版本，`/[cdnHost]/[projectName]/[subAppName]/[x.y.z]/index.{js,css}`
- 样式，LESS 文件支持 CSS Modules，CSS/SCSS 使用标准 CSS
- 状态管理，灵活支持 Redux/MobX/Dva 等不同的状态管理框架，对于 Redux 提供全局统一的 Store 声明

# Structure | 项目结构

完整的微前端应用，可能会包含以下组成部分：

- Module | 模块: 模块是可单独编译、发布的基础单元，基础模式下可直接打包入主应用，标准模式下多项目共用时可单独打包为 AMD/UMD 格式，通过 SystemJS 引入
- Page | 页面: 页面不可单独编译，使用 Webpack SplitChunk 或其他机制进行异步加载
- App | 应用: 应用是对模块的扩展，是实际用户可见的部分
- Widget | 控件: 控件是特殊的模块，譬如通用的无业务组件等
- Extension | 扩展: 扩展是特殊的应用，提供了跨模块的通用功能，类似于 Chrome Extension 的定位

基于此，我们可以将某个微前端应用抽象为如下不同的模块组：

基础模块：

- rtw: 根目录，public 目录下包含了部分跨模块集成测试的代码

核心模块：

- rtw-core/rtw-sdk/rtw-shared: 暴露给子应用可用的通用基础类、模型定义、部分无界面独立模块等。rtw-core 建议不放置界面相关，使用 Jest UT 方式进行功能验证。
- rtw-bootstrap: 完整项目级别编译与启动入口，包含项目的运行时配置、依赖配置\消息总线、注册中心、核心模块加载机制等。
- rtw-host-app: 提供界面基础容器，譬如应用标准的 Layout，Menu 等组件；提供 Redux 核心 Store。

子业务应用：

- rtw-mobx-app: MobX 示例应用
- rtw-redux-app: Redux 示例应用

扩展模块：

- rtw-widgets: 包含部分业务型控件，提供给所有的子应用使用，提取通用业务逻辑、对上屏蔽部分第三方依赖关系，类似于完整的 OSS 文件上传控件等。
- rtw-extensions: 包含部分业务无关的通用型插件，类似于 Chrome Extension 的定位。
- rtw-worker: 包含通用的 Web Worker & WASM 计算模块，子应用内也可以通过 Buffer 方式直接引入自定义的 Worker

如果希望在子应用 A 中加载子应用 B 的实例，则应该使用类似于依赖注入的方式，从统一的注册中心中获取该实例对象。所有各个模块共享的基础库，都必须以 UMD 模式加载到全局；rtw-host-app 中声明与使用需要展示哪些模块，rtw-bootstrap 中注册可提供的 UMD 子模块。

项目使用 Webpack 作为项目的配置打包工具，同样遵循透明原则；所有的子模块中的 Webpack 配置文件是引用并根据自身需求修改之后的根目录下的 scripts 中的配置文件。值得一提的是，根据 Node 的模块索引规则，scripts 目录下的配置文件会引用根目录下的 node_modules 文件，因此同样需要在根目录下安装 Webpack 及相关的依赖。

# 开发模式

笔者一直推崇[渐进式的工程架构](https://parg.co/rAn)，因此该模板对于复杂度要求较低的项目而言，可以直接从基础模式启动，与其他 TS 项目并无太大区别。

## 基础模式

基础模式类似于(伪)多模块单页面，仅有唯一的 Host APP 作为编译与运行的入口，其他包体（譬如 rtw-core）直接打包进主包体中，不使用 SystemJS 进行独立加载。

### `rtw-core`

rtw-core 及相似的库承载了公共的结构定义、工具类等，在该包体目录下运行 `npm run build` 命令即可以生成 ES/CJS/UMD 等多种类型文件，以及 types 类型定义；可以直接通过 npm publish 来发布到公共/私有的 NPM 仓库中。

其他包体通过 NPM 安装 rtw-core 并使用，如果以标准模式运行，则需要首先加载该库到全局作用域，利用 RequireJS/SystemJS 等工具遵循 AMD 规范来注入到其他依赖的库/应用中。

值得一提的是，对于子应用中，如果存在需要共享组件/类型的情景。对于类型信息，建议是将子应用同样编译打包发布到 NPM 仓库中，纯组件可以直接引入，对于业务组件建议通过全局的注册中心来获取。

### `rtw-host-app`

在 rtw-host-app 包下，执行 `npm run dev:sa` 命令，会从 `src/index.sa` 文件启动应用；如上文所述，该模式仅会基于 Webpack Splitted Chunk 进行异步加载，其开发流程与标准的单模块应用并无区别。

## 标准模式

### `rtw-bootstrap & rtw-host-app`

rtw-bootstrap 是微前端应用的实际启动点，其核心功能是执行依赖与子应用的注册。在启动时，其会根据传入的 `__HOST_APP__` 与 `__DEV_APP__` 等变量信息完成应用的顺序加载与启动。在标准模式下，rtw-host-app 的入口是 `src/index` 文件，该模式下，index 文件会对外暴露 render 函数，该函数会由 rtw-bootstrap 注入 importApp 函数来执行子应用加载：

```ts
export function render(_importApp: Function) {

  importApp = _importApp;

  ReactDOM.render(
    ...
  );
}
```

换言之，rtw-bootstrap 提供了应用加载的能力，而 rtw-host-app 决定了应该加载哪些应用；在实际案例中，我们应该将用户权限控制、菜单与子应用信息获取等业务操作放置在 rtw-host-app 中。

### `rtw-redux-app & rtw-mobx-app`

这里以 rtw-mobx-app 为例介绍如何进行子应用开发，如果是项目已经发布上线，那么我们可以通过 Resource Overrides 等在线资源请求转发的工具将线上资源请求转发到本地服务器。在进行本地开发时，因为子应用本身并不会包含 `ReactDOM.render` 或者类似的将 Virtual DOM 渲染到界面的函数，因此在运行 `npm run dev` 之后，本地会开启生成 UMD 文件的 Webpack Dev Server。参考子应用的 `public/index.html` 文件：

```html
<script src="./bootstrap/static.js" type="text/javascript"></script>
<script src="./bootstrap/runtime.js" type="text/javascript"></script>
<script src="./bootstrap/vendors.js" type="text/javascript"></script>

<script>
  // 联调环境
  //   window.__HOST_APP__ = {
  //     id: 'host',
  //     name: 'HOST APP',
  //     module: 'http://0.0.0.0:8081/index.js',
  //     css: 'http://0.0.0.0:8081/index.css'
  //   };

  // 正式开发环境
  window.__HOST_APP__ = {
    title: 'HOST APP',
    module: '/release/rtw-host-app/index.js',
    css: '/release/rtw-host-app/index.css'
  };

  window.__DEV_APP__ = { id: 'dev', name: 'DEV APP', module: '/index.js' };
</script>
<script src="./bootstrap/index.js" type="text/javascript"></script>
```

可以看出子应用的启动需要依赖于 rtw-bootstrap 以及 rtw-host-app，如果项目已经发布上线，那么建议是直接从 CDN 加载资源；否则可以将资源放置到 `public/release` 目录下。如果本地需要同时调试 Host APP，则直接也将 Host APP 以开发方式运行（`npm run dev`），然后直接引入 Webpack Dev Server 生成的资源地址即可。

# 延伸阅读

- 如果希望实践掌握 **Web 开发**，可以阅读 [JavaScript CheatSheet](https://parg.co/rdm)/[ProgrammingLanguage-Series/JavaScript](https://github.com/wxyyxc1992/ProgrammingLanguage-Series/tree/master/JavaScript)，[DOM CheatSheet](https://parg.co/rdG)/[CSS CheatSheet](https://parg.co/rdo)，[React CheatSheet](https://parg.co/rdA)/[Vue CheatSheet](https://parg.co/rdd)，[现代 Web 开发基础与工程实践](https://github.com/wxyyxc1992/Web-Series)/[Web Tuning CheatSheet](https://parg.co/rd0) 等。

# Todos

- [ ] 使用 webpack-merge 替代目前的朴素对象合并
