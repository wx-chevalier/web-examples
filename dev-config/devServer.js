var path = require('path');
var express = require('express');
var webpack = require('webpack');
var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');

//默认是开发时配置
var config = require('./webpack.config');
var appsConfig = require("./apps.config");

var app = express();
var compiler = webpack(config);

var dashboard = new Dashboard();

//添加Webpack Dashboard支持
compiler.apply(new DashboardPlugin(dashboard.setData));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  quiet: true,
  publicPath: config.output.publicPath,
  host: '0.0.0.0'
}));

app.use(require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
}));

app.get('*', function (req, res) {

  res.set({
    'Access-Control-Allow-Origin': '*'
  });

  res.sendFile(path.join(__dirname + "/", "dev.html"));
});

//监听本地端口
app.listen(appsConfig.devServer.port, '0.0.0.0', function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://0.0.0.0:3000');
});
