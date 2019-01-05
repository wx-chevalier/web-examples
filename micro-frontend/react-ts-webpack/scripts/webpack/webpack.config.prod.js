const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const baseConfig = require('./webpack.config.base');

const { buildEnv } = baseConfig.extra;

const config = {
  ...baseConfig,
  devtool: 'hidden-source-map',
  mode: 'production',
  output: {
    ...baseConfig.output,
    filename: '[name].js'
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
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
    }),

    // 使用 Prepack 优化包体大小
    // 暂时存在 Bug,等待修复
    // 使用前 21 - 425
    // 使用后 21 - 433
    // new PrepackWebpackPlugin({
    //   mathRandomSeed: '0'
    // }),

    // 必须将 CopyWebpackPlugin 与 HtmlWebpackPlugin 添加到末尾
    new CopyWebpackPlugin([{ from: buildEnv.public, to: buildEnv.build }]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../template/template.ejs'),
      title: 'Webpack React',
      favicon: path.join(baseConfig.extra.buildEnv.public, 'favicon.ico'),
      manifest: path.join(buildEnv.public, 'manifest.json'),
      meta: [
        { name: 'robots', content: 'noindex,nofollow' },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'
        }
      ],
      appMountIds: ['root'],
      inject: false,
      minify: {
        html5: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        preserveLineBreaks: true,
        removeComments: true,
        keepClosingSlash: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      mobile: true,
      scripts: ['./static.js']
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({
        exclude: /.*ts-worker.*/
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          enforce: true,
          chunks: 'all'
        },
        // 将所有的样式文件打包到单个项目
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
};

delete config.extra;

module.exports = config;
