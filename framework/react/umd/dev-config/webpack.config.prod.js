const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const baseConfig = require('./webpack.config.base');

const config = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },
  module: {
    rules: [
      ...baseConfig.module.rules.filter(
        rule => !['/\\.css$/', '/\\.less$/', '/\\.(scss|sass)$/'].includes(rule.test.toString())
      ),
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        exclude: /antdTheme/,
        use: [
          MiniCssExtractPlugin.loader,
          baseConfig.extra.moduleCSSLoader,
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          baseConfig.extra.moduleCSSLoader,
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    ...baseConfig.plugins,
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true)
    })

    // 使用 Prepack 优化包体大小
    // 暂时存在 Bug,等待修复
    // 使用前 21 - 425
    // 使用后 21 - 433
    // new PrepackWebpackPlugin({
    //   mathRandomSeed: '0'
    // }),

    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static'
    // })
  ],
  optimization: {
    runtimeChunk: 'single',
    minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin({})]
  }
};

delete config.extra;

module.exports = config;
