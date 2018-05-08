const baseConfig = require("../dev-config/webpack.config.base")

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      ...baseConfig.module.rules
    ],
  },
};
