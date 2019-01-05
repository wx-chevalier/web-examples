const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const baseConfig = require('./webpack.config.base');

const config = {
  ...baseConfig,
  devtool: 'hidden-source-map',
  output: {
    ...baseConfig.output,
    filename: '[name].js',
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    ...baseConfig.plugins,
    new CopyWebpackPlugin([{ from: buildEnv.public, to: buildEnv.build }]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './lib/template.ejs'),
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
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css'
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true)
    }),
    new OfflinePlugin({
      ServiceWorker: {
        minify: false
      }
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
          chunks: 'initial'
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
