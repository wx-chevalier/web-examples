const path = require('path');

const prodConfig = require('./webpack.config.prod');
const rootPath = process.cwd();

const plugins = [...prodConfig.plugins];

// 移除 CopyWebpackPlugin 与 HtmlWebpackPlugin
plugins.pop();
plugins.pop();

const umdConfig = {
  ...prodConfig,
  output: {
    filename: '[name].js',
    path: path.resolve(rootPath, './dist'),
    // 默认不允许挂载在全局变量下
    // library: library,
    libraryTarget: 'umd'
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    },
    'styled-components': {
      commonjs: 'styled-components',
      commonjs2: 'styled-components'
    }
  },
  plugins
};

delete umdConfig.optimization;

module.exports = umdConfig;
