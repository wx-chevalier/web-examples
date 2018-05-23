# Rollup Boilerplate

项目参考了 [rollup/rollup-starter-lib](https://github.com/rollup/rollup-starter-lib) 与 [leohxj/rollup-starter-kit](https://github.com/leohxj/rollup-starter-kit)。

# Plugins

* [rollup-plugin-alias](https://link.zhihu.com/?target=https%3A//github.com/rollup/rollup-plugin-alias): 提供 modules 名称的 alias 和 reslove 功能
* [rollup-plugin-babel](https://link.zhihu.com/?target=https%3A//github.com/rollup/rollup-plugin-babel): 提供 Babel 能力, 需要安装和配置 Babel
* [rollup-plugin-eslint](https://link.zhihu.com/?target=https%3A//github.com/TrySound/rollup-plugin-eslint): 提供 ESLint 能力, 需要安装和配置 ESLint
* [rollup-plugin-node-resolve](https://link.zhihu.com/?target=https%3A//github.com/rollup/rollup-plugin-node-resolve): 解析 node_modules 中的模块
* [rollup-plugin-commonjs](https://link.zhihu.com/?target=https%3A//github.com/rollup/rollup-plugin-commonjs): 转换 CJS -> ESM, 通常配合上面一个插件使用
* [rollup-plugin-replace](https://link.zhihu.com/?target=https%3A//github.com/rollup/rollup-plugin-replace): 类比 Webpack 的 [DefinePlugin](https://link.zhihu.com/?target=https%3A//webpack.js.org/plugins/define-plugin/) , 可在源码中通过 `process.env.NODE_ENV` 用于构建区分 Development 与 Production 环境.
* [rollup-plugin-filesize](https://link.zhihu.com/?target=https%3A//github.com/ritz078/rollup-plugin-filesize): 显示 bundle 文件大小
* [rollup-plugin-uglify](https://link.zhihu.com/?target=https%3A//github.com/TrySound/rollup-plugin-uglify): 压缩 bundle 文件
* [rollup-plugin-serve](https://link.zhihu.com/?target=https%3A//github.com/thgh/rollup-plugin-serve): 类比 [webpack-dev-server](https://link.zhihu.com/?target=https%3A//github.com/webpack/webpack-dev-server), 提供静态服务器能力