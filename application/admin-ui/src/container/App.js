// @flow

declare var __SSR__;

import React, { Component } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";

const Router = __SSR__ ? BrowserRouter : HashRouter;

export default class App extends Component {}
