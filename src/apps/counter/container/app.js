import React from "react";
import {render} from "react-dom";
import {bindActionCreators} from "redux";
import {connect, Provider} from "react-redux";
import Counter from "../components/Counter";
import * as CounterActions from "../actions/counter";
import configureStore from "../store/configureStore";
//调试Counter

const store = configureStore({counter: 0}) //初始化Store

//将State映射为Props
function mapStateToProps(state) {
    return {
        counter: state.counter
    }
}

//将Dispatch映射为Props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(CounterActions, dispatch);
}

let App = connect(mapStateToProps, mapDispatchToProps)(Counter);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
