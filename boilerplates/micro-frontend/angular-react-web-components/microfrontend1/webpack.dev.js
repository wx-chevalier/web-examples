const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  output: {
    filename: "[name].js"
  },
  devServer: {
    port: 4300
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["main"],
      filename: "angular-app.html",
      template: path.resolve(__dirname, "src/angular-app.html"),
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/application.html"),
      inject: false
    })
  ]
});
