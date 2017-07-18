
最近笔者在逐步将之前的项目升级为 Webpack2 + ReactRouter4，同时优化 MobX/Redux 搭配的状态管理模式，以及将通用组件抽取到 React Storybook 中切向所谓组件驱动开发。对于其中浅薄的工程化的思考可以参考[2016-我的前端之路:工具化与工程化](https://zhuanlan.zhihu.com/p/24575395),对于模板中配置的详解参考详细的从零到一的 React 及其技术栈使用教程]，这也是笔者当前仓库中另一个主要内容。
言归正传，笔者最近团队中项目在逐步增多，特别是有很多小的需要快速搭建的项目；由于人员素质相对参差，并且技术包括实践衍化过快，笔者就花了几小时参考了[ create-react-app](https://segmentfault.com/a/1190000006055973) 将 [Webpack2-Boilerplate](https://github.com/wxyyxc1992/Webpack2-React-Redux-Boilerplate/blob/master/boilerplate/README.md) 封装了一下。目前存在大量的问题，预定的四个模式中也只完善了最基本的纯 React 应用，欢迎大家提出指导或者有什么觉得不错的特性。

可以直接使用 npm 或者 yarn 安装：
```
npm install create-react-boilerplate -g
```
基本使用方式类似于 create-react-app，直接创建项目：

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/2/2/WX20170221-22060311.png)

其支持四个模板类型：
- pwa：侧重 React，React StoryBook， ReactRouter4
- mobx：侧重 mobx
- redux：侧重 redux
- full：侧重完整的工程项目

```
create-react-boilerplate app
```
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/2/2/WX20170221-220910aa.png)

create-react-boilerplate 并没有负责安装依赖，项目创建之后切换到项目目录，执行`sh ./install.sh`安装依赖，包括：

```
#!/usr/bin/env bash
npm install --global yarn
yarn install #安装本地package.json中依赖
yarn global add flow-bin #全局安装flow类型检查工具
yarn global add cnpm-check #全局安装npm-check
yarn global add babel-cli #全局安装Babel CLI命令行工具
yarn global add weinre #全局安装调试工具
```

安装完毕后执行`npm start`即可进入开发模式，关于这里的几个构建目标可以参考[详细的从零到一的 React 及其技术栈使用教程](https://github.com/wxyyxc1992/Webpack2-React-Redux-Boilerplate/blob/master/boilerplate/README.md)。

