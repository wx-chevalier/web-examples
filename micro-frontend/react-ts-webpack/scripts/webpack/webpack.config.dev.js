const webpack = require('webpack');
const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');

const baseConfig = require('./webpack.config.base');

const config = {
  ...baseConfig,
  mode: 'development',
  devtool: 'eval',
  plugins: [
    ...baseConfig.plugins,

    // 在控制台中输出可读的模块名
    new webpack.NamedModulesPlugin(),

    // 避免发出包含错误的模块
    new webpack.NoEmitOnErrorsPlugin(),

    // 定义控制变量
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false)
    }),
    new DashboardPlugin()
  ],
  devServer: {
    // 设置生成的 Bundle 的前缀路径
    publicPath: '/',
    // assets 中资源文件默认应该还使用 assets
    contentBase: path.resolve(__dirname, '../../examples'),
    compress: true,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    },
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    https: false,
    disableHostCheck: true,
    quiet: false
  },
  stats: {
    children: false
  }
};

delete config.extra;

module.exports = config;
