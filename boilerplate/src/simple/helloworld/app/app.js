/**
 * Created by apple on 16/7/23.
 */
// @flow
import React, { Component } from 'react';
import logo from '../logo.svg';
import './app.css';
import LazilyLoad, { importLazy } from '../../../common/utils/load/lazily_load';


class App extends Component {


  constructor() {
    super(...arguments);
    this.state = {
      load: false,
      count: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {

    console.trace(this.setState);

    this.setState({
      load: !this.state.load,
      count: this.state.count + 1
    }, () => {
      console.log(this.state.count);
      console.log('加载完成')
    });

    await this.setStateAsync({
      load: !this.state.load,
      count: this.state.count + 1
    });

    console.log(this.state.count);
    console.log('加载完成Async');

    this.setState(function (prevState, props) {

      console.log(prevState);

      return {count: this.state.count + 1}

    }, () => {
      console.log(this.state.count);
      console.log('加载完成')
    });


  }

  setStateAsync(nextState) {

    return new Promise((resolve, reject) => {

      this.setState(nextState, () => {
        resolve();
      })

    })
  }

  render() {

    //测试Flow类型检查工具
    const title: string = 'WXChevalier Presentation';

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1>WXChevalier Presentation</h1>
          <h2>Welcome to React By Webpack-React-Redux-Boilerplate</h2>
        </div>
        <p className="App-intro">
          应用入口参考 <code>src/App.js</code>
        </p>

        <p>
          <a
            style={{ color: 'blue' }}
            onClick={this.handleClick}>点击加载JQuery</a>
        </p>

        <LazilyLoad modules={{
          LoadedLate: () => importLazy(System.import('../lazy/loaded_late.js'))
        }}>
          {
            ({LoadedLate}) => {
              return <LoadedLate />
            }
          }
        </LazilyLoad>

        {/*{this.state.load ? <LoadedJQuery /> : null}*/}

      </div>
    );
  }
}

export default App;