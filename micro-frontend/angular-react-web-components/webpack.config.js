const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
  const prod = env && env.production;

  console.log("Environment: " + (prod ? "production" : "development"));

  return {
    entry: {
      main: root("src/main.js")
    },
    output: {
      path: root("dist"),
      filename: prod ? "[name].[chunkhash].js" : "[name].js"
    },
    resolve: {
      extensions: [".js"]
    },
    devServer: {
      port: 4300,
      contentBase: "dist"
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: root("src/index.html"),
        inject: false
      })
    ]
  };
};

function root(file) {
  return path.resolve(__dirname, file);
}
