import TimerView from './views/timerView'
import Todos from './views/todos'
import ClearBtn from './views/clearBtn'
import ReactDOM from 'react-dom'
import React from 'react'
import styles from 'src/css/app'
const debug = require('debug')('React:App')

class App extends React.Component {
  render() {
    debug('render')
    return (
      <div className={ styles.app }>
        <TimerView />
        <div style={{ height: 1200 }}></div>
        <h1>Todos</h1>
        <Todos/>
        <br/>
        <ClearBtn/>
        <br/>
      </div>
    )
  }

  onReset() {
    this.props.appState.resetTimer()
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('mount')
)
