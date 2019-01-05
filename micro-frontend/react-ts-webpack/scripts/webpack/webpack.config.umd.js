const path = require('path');

const prodConfig = require('./webpack.config.prod');
const { library, libraryEntry = 'index.js' } = require('../package.json');

const umdConfig = {
  ...prodConfig,
  output: {
    filename: '[name].umd.js',
    path: buildEnv.build,
    library: library,
    libraryTarget: 'umd'
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom')
    }
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
  }
};

delete umdConfig.optimization;

module.exports = umdConfig;
