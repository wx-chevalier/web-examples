import { action, observable } from 'mobx'

const appState = observable({
  time: 1,
  resetTimer() {
    this.time = 0
  }
})

setInterval(action(function() {
  appState.time += 1
}), 1000)

export default appState
