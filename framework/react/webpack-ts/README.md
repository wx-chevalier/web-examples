![](https://www.robinwieruch.de/img/posts/minimal-react-webpack-babel-setup/banner.jpg)

# React & Webpack Boilerplate, with TypeScript

本项目是基于 Webpack 与 TypeScript 的 React 前端项目模板，相较于 [webpack-react](../webpack-react)，其使用 TypeScript 替代了标准的 ES6，并且使用 awesome-typescript-loader 进行代码转换。

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

# 执行测试
$ npm run test
```

# Motivation & Credits

* [react-typescript-samples](https://github.com/Lemoncode/react-typescript-samples)
