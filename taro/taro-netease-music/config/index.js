const path = require('path')

const config = {
  projectName: 'my-taro',
  date: '2018-11-17',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread'
      ]
    }
  },
  defineConstants: {
  },
  copy: {
    patterns: [
      { from: 'src/components/wxParse/wxParse.wxss', to: 'dist/components/wxParse/wxParse.wxss'},
      { from: 'src/components/wxParse/wxParse.wxml', to: 'dist/components/wxParse/wxParse.wxml'},
      { from: 'src/img/day.jpeg', to: 'dist/img/day.jpeg'},
      { from: 'src/img/login.jpeg', to: 'dist/img/login.jpeg'},
    ],
    options: {
    }
  },
  alias: {
    'wTaro': path.resolve(__dirname, '..', 'src/components/taro-ui/dist/index'),
    'globaData': path.resolve(__dirname, '..', 'src/global_data.js'),
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        pxtransform: {
          enable: true,
          config: {

          }
        },
        url: {
          enable: true,
          config: {
            limit: 10240 // 设定转换尺寸上限
          }
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
