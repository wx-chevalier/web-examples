/**
 * Created by apple on 16/9/13.
 */
import React from "react";
import App from "./pwa/App";
import { clientRender } from "../dev-config/wrapper/render";

//将组件渲染到DOM中
clientRender(<App />, document.getElementById("root"), "./pwa/App", true);
