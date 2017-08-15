/** Webpack 的服务端渲染配置 */

const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

const ssrServer = require("./apps.config").ssrServer;

const nodeModules = {};

//遍历所有的NodeModules以防止意外引入
fs
  .readdirSync("node_modules")
  .filter(function(x) {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = "commonjs " + mod;
  });

//设置基本的模块导入导出规范
module.exports = {
  entry: ssrServer.serverEntrySrc,
  target: "node",
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "ssr_server.bundle.js"
  },
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(css|less|scss)$/,
        loader: "raw-loader"
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
        loader: "url-loader?limit=8192&name=assets/[hash].[ext]"
      }
    ]
  },
  plugins: [
    //定义环境变量
    new webpack.DefinePlugin({
      //判断当前是否处于开发状态
      __DEV__: JSON.stringify(false),
      __SSR__: JSON.stringify(true)
    })
  ],
  devtool: "sourcemap"
};
