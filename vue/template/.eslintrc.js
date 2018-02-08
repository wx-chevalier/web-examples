// eslint-disable-next-line

const eslintrc = {
  // extends: ["eslint-config-airbnb-base"],
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  plugins: ["vue", "babel", "jest"],
  rules: {
    "func-names": 0,
    "arrow-body-style": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/no-extraneous-dependencies": 0,
    "no-param-reassign": 0,
    "no-return-assign": 0,
    "max-len": 0,
    "consistent-return": 0,
    "no-redeclare": 0,
    "comma-dangle": ["warn", "always-multiline"]
  }
};

module.exports = eslintrc;
