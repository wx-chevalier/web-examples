/* eslint-disable no-unused-vars */

module.exports = ctx => ({
  plugins: {
    cssnano: {
      preset: 'default'
    },
    // 'postcss-flexbugs-fixes': {},
    autoprefixer: {
      browsers: ['> 1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
      flexbox: 'no-2009'
    }
  }
});
