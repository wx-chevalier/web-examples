const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, "../dist/microfrontend1"),
    filename: "[name].[chunkhash].js"
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["main"],
      filename: "index.html",
      template: path.resolve(__dirname, "src/angular-app.html"),
      inject: false
    })
  ]
});
