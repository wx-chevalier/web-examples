/* tslint:disable:object-literal-sort-keys */
export const vendors = [
  {
    key: 'antd',
    version: '3.9.3',
    dev: {
      css: '//unpkg.com/antd@__VERSION__/dist/antd.css',
      module: '//unpkg.com/antd@__VERSION__/dist/antd.js'
    },
    prod: {
      css: '//unpkg.com/antd@__VERSION__/dist/antd.min.css',
      module: '//unpkg.com/antd@__VERSION__/dist/antd.min.js'
    }
  },
  {
    key: 'moment',
    version: '2.22.0',
    dev: {
      module: '//unpkg.com/moment@__VERSION__/moment.js'
    },
    prod: {
      module: '//unpkg.com/moment@__VERSION__/min/moment.min.js'
    }
  },
  {
    key: 'react',
    version: '16.6.0',
    dev: {
      module: '//unpkg.com/react@__VERSION__/umd/react.development.js'
    },
    prod: {
      module: '//unpkg.com/react@__VERSION__/umd/react.production.min.js'
    }
  },
  {
    key: 'react-dom',
    version: '16.6.0',
    dev: {
      module: '//unpkg.com/react-dom@__VERSION__/umd/react-dom.development.js'
    },
    prod: {
      module: '//unpkg.com/react-dom@__VERSION__/umd/react-dom.production.min.js'
    }
  },
  {
    key: 'react-router-dom',
    version: '4.3.1',
    dev: {
      module: '//unpkg.com/react-router-dom@__VERSION__/umd/react-router-dom.js'
    },
    prod: {
      module: '//unpkg.com/react-router-dom@__VERSION__/umd/react-router-dom.min.js'
    }
  }
];
