import {createStore, applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import createLogger from "redux-logger";
import reducer from "../reducers/index";

//创建一个日志记录器实例
const logger = createLogger();

//设置默认的创建Store的方法
export default function configureStore(initialState) {

    //创建一个新的store
    const store = createStore(reducer, initialState, compose(
        applyMiddleware(thunk, promise, logger),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    //判断是否需要进行热加载
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers')
            store.replaceReducer(nextReducer)
        })
    }

    return store;
}