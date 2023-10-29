// shared alias for all shells
const path = require('path')
const nodeEnv = process.env.NODE_ENV || 'dev'
module.exports = {
  src: path.resolve(__dirname, '../src'),
  store: path.resolve(__dirname, '../src/store'),
  components: path.resolve(__dirname, '../src/components'),
  utils: path.resolve(__dirname, '../src/utils'),
  SRC: path.resolve(__dirname, '../src/bill'),
  BASE: path.resolve(__dirname, '../src/bill/base'),
  BILL_VIEWS: path.resolve(__dirname, '../src/bill/billPage/views'),
  BASE_URL: path.resolve(__dirname, '../src/bill/config/' + nodeEnv),
}
