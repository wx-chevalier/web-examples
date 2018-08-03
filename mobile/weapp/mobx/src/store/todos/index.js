import { observable } from 'mobx'
import { showToast } from '../../utils'

let  uid = 0
const todos = {
  items: [],
  clear: function() {
    this.items = []
  },
  add: function(content) {
    if (!content) {
      showToast('请填写TODO')
      return false
    }
    this.items.push({
      startAt: Date.now(),
      isFinish: false,
      uid: uid++,
      content,
      toggle: function() {
        this.isFinish = !this.isFinish
      }
    })
    return true
  }
}
export default observable(todos)


// import { extendObservable, action } from 'mobx'
// import Todo from './item'
//
// export default function todos () {
//   extendObservable(this, {
//     items: [],
//     add: action(function(content) {
//       this.items.push(new Todo(content))
//     })
//   })
// }
