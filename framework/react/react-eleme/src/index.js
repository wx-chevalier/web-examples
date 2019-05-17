
/*eslint-disable*/
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import store from './stores'
import App from './pages'
import './assets/css/common.less'

// requires and returns all modules that match
const requireAll = requireContext => requireContext.keys().map(requireContext)
// import all svg
const reqSvg = require.context('./assets/svg', true, /\.svg$/)
requireAll(reqSvg)

const render = Component => (
  ReactDOM.render((
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>
  ), document.getElementById('root'))
)

render(App)

if (module.hot) {
  module.hot.accept('./pages', () => {
    render(App)
  })
}
