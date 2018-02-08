import React from "react";
import ReactDOM from "react-dom";
import logo from "../public/logo.svg";
import "./index.css";

const App = () => (
  <div className="App">
    <img className="App-Logo" src={logo} alt="React Logo" />
    <h1 className="App-Title">Hello Parcel x React</h1>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
