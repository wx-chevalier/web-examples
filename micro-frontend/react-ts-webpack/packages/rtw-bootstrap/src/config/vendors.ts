/* tslint:disable:object-literal-sort-keys */
export const vendors = [
  {
    id: '@wx/rtw-core',
    version: '0.0.1',
    dev: {
      module: '/release/rtw-core/index.js'
    },
    prod: {
      module: '/release/rtw-core/index.js'
    }
  },
  {
    id: 'antd',
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
    id: 'moment',
    version: '2.22.0',
    dev: {
      module: '//unpkg.com/moment@__VERSION__/moment.js'
    },
    prod: {
      module: '//unpkg.com/moment@__VERSION__/min/moment.min.js'
    }
  },
  {
    id: 'react',
    version: '16.6.0',
    dev: {
      module: '//unpkg.com/react@__VERSION__/umd/react.development.js'
    },
    prod: {
      module: '//unpkg.com/react@__VERSION__/umd/react.production.min.js'
    }
  },
  {
    id: 'react-dom',
    version: '16.6.0',
    dev: {
      module: '//unpkg.com/react-dom@__VERSION__/umd/react-dom.development.js'
    },
    prod: {
      module: '//unpkg.com/react-dom@__VERSION__/umd/react-dom.production.min.js'
    }
  },
  {
    id: 'react-router-dom',
    version: '4.3.1',
    dev: {
      module: '//unpkg.com/react-router-dom@__VERSION__/umd/react-router-dom.js'
    },
    prod: {
      module: '//unpkg.com/react-router-dom@__VERSION__/umd/react-router-dom.min.js'
    }
  }
];
