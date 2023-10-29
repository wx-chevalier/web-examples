import React from 'react'
import { observer } from 'mobx-react'
import timer from 'store/timerView'

class TimerView extends React.Component {
  render() {
    return (
      <button onClick={() => timer.resetTimer() }>
        Seconds passed: {timer.time}
      </button>
    )
  }
}

export default observer(TimerView)
