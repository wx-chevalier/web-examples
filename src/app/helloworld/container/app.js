import React from 'react'
import { render } from 'react-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'

import * as actions from "../actions/actions"
import HelloWorld from "../components/HelloWorld"
import configureStore from "../store/configureStore"

const store = configureStore(); //初始化Store

//将State映射为Props
function mapStateToProps(state) {
    return {
        text:state
    }
}

//将Dispatch映射为Props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

let App = connect(mapStateToProps, mapDispatchToProps)(HelloWorld);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

//默认导出App组件
export default App;
