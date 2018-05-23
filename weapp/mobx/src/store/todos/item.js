import { extendObservable } from 'mobx'

let uid = 0
export default function todo (content) {
  extendObservable(this, {
    startAt: Date.now(),
    isFinish: false,
    uid: uid++,
    content,
    toggle: function() {
      this.isFinish = !this.isFinish
    }
  })
}
