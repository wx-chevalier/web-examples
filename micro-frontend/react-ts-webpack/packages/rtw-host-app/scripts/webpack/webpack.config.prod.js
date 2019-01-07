const merge = require('webpack-merge');

const prodConfig = require('../../../../scripts/webpack/webpack.config.prod');

module.exports = merge(prodConfig, {
  entry: {
    main: path.resolve(__dirname, '../../src/dev')
  }
});
