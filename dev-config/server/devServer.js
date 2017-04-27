var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

//默认是开发时配置
var config = require('./../webpack.config.js');
var appsConfig = require("./../apps.config.js");

new WebpackDevServer(webpack(config), {
  //设置WebpackDevServer的开发目录
  contentBase: path.join(__dirname + "/"),
  // publicPath: `http://0.0.0.0:${appsConfig.devServer.port}/`,
  hot: true,
  historyApiFallback: true,
  quiet: true,
  noInfo: true,
  stats: {colors: true},
  proxy: appsConfig.proxy
}).listen(appsConfig.devServer.port, '0.0.0.0', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log(`Listening at http://0.0.0.0:${appsConfig.devServer.port}/`);
});