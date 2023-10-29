const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [autoprefixer({ browsers: ['last 4 versions'], flexbox: 'no-2009' })]
};
