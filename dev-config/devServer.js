var path = require('path');
var express = require('express');
var webpack = require('webpack');
//默认是开发时配置
var config = require('./webpack.config');
var appsConfig = require("./apps.config");

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    host: "0.0.0.0" //支持局域网监听
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
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
