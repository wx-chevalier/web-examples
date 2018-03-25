import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AnimationExample from './animated-transition/animated';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*基本示例*/}
        <BasicExample />
        {/*转场动画*/}
        <AnimationExample />
      </div>
    );
  }
}

export default App;
