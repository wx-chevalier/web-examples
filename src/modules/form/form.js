import React from "react";
import {render} from "react-dom";
import {bindActionCreators} from "redux";
import {connect, Provider} from "react-redux";
import configureStore from "./store/configureStore";
import SimpleForm from "./components/simple_form/simple_form";


const store = configureStore(); //初始化Store

render(
    <Provider store={store}>
        <SimpleForm onSubmit={()=>{}} defaultValue={{
            firstName:"张"
        }}/>
    </Provider>,
    document.getElementById('root')
);
