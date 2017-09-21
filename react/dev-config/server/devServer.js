/** 自定义的 Webpack Dev Server */
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const fs = require('fs-extra');

// 默认是开发时配置
const config = require('./../webpack.config.js');
const appsConfig = require('../apps.config.js');

new WebpackDevServer(webpack(config), {
  // 设置 WebpackDevServer 的开发目录，如果不设置的话则会默认为当前项目的根目录
  contentBase: path.join(__dirname, '../../public'),
  publicPath: '/',
  proxy: appsConfig.proxy,
  // 其他配置项
  compress: true,
  hot: true,
  historyApiFallback: true,
  quiet: true,
  noInfo: true,
  stats: { colors: true },
  disableHostCheck: true,
}).listen(appsConfig.devServer.port, '0.0.0.0', (err, _) => {
  if (err) {
    console.log(err);
  }
  // 复制文件
  fs.copy(
    path.resolve(__dirname, './dev.html'),
    path.resolve(__dirname, '../../public/index.html')
  );
  console.log(`Listening at http://0.0.0.0:${appsConfig.devServer.port}/`);
});
