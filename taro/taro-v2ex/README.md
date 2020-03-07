# Taro-V2EX

这个项目使用了 Taro 构建了一个 [V2ex](www.v2ex.com) 论坛小程序。主要目的在于展示如何使用 TypeScript 构建 Taro 项目和使用内置的事件中心跨组件/路由传递消息。

[![v2ex.gif](https://i.loli.net/2018/08/15/5b73d86a54514.gif)](https://i.loli.net/2018/08/15/5b73d86a54514.gif)


## 运行

```bash
$ npm install
$ npm i -g @tarojs/cli
$ taro build --type weapp --watch
```

## 限制

宥于 V2EX API 的限制，本项目有几个限制：

1. 没有「获取更多」的这个 API，除了回复可以全部载入之外所有 API 都不能加载更多信息；
2. 每个 IP 每小时只能访问 API 100 次，超过便无法访问；
3. 无法跨域，因此没有 h5 版本；

## 建议

对于在 Taro 中使用 TypeScript 有一些建议：

* 使用 tslint 作为编辑器内置的 linter
* 使用 eslint 命令行工具配合 `typescript-eslint-parser` 和 `eslint-config-taro`(见 [.eslintrc](./eslintrc)) 作为 `precommit` 或者 `prepush` 的钩子，在提交或 commit 或编译出现问题时检查代码是否符合 Taro 规范
* 不要在 TypeScript 使用 Redux 的 `connect` 装饰器，使用普通的函数写法,详情见: [#9951](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/9951)
* 当你的项目不那么复杂时，可以不使用 Redux
