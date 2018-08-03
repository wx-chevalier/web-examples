/**
 * 功能：开发服务器配置文件
 */

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const fs = require('fs-extra');
const opn = require('opn');

//默认是开发时配置
const config = require('../webpack/webpack.config.js');
const appsConfig = require('../apps.config.js');

const port = appsConfig.devServer.port;
const proxy = appsConfig.api.proxy;

new WebpackDevServer(webpack(config), {
  // 设置 WebpackDevServer 的开发目录，默认为当前项目的根目录
  contentBase: path.join(__dirname, '../../public'),
  publicPath: `/`,
  proxy,

  // 其他配置项
  compress: false,
  hot: true,
  historyApiFallback: true,
  quiet: true,
  noInfo: true,
  stats: { colors: true },
  disableHostCheck: true,
}).listen(port, '0.0.0.0', function(err, result) {
  if (err) {
    return console.log(err);
  }
  // 复制文件
  fs.copy(
    path.resolve(__dirname, './dev.html'),
    path.resolve(__dirname, '../../public/index.html')
  );
  console.log(`Listening at http://0.0.0.0:${port}/`);

  opn(`http://localhost:${port}/`);
});
