import React from 'react'
import { render } from 'react-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'

import Counter from '../components/Counter' // 导入组件
import * as CounterActions from '../actions/counter' // 导入Actions
import configureStore from '../store/configureStore' // 导入配置的Store

//调试Counter

const store = configureStore() //初始化Store

//将State映射为Props
function mapStateToProps(state) {
    return {
        counter: state.counter
    }
}

//将Dispatch映射为Props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(CounterActions, dispatch)
}

let App = connect(mapStateToProps, mapDispatchToProps)(Counter);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
