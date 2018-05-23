import { mobx } from '../lib/logic'

export default function mobxPage(page) {
  Page(Object.assign({}, page, {
    onLoad() {
      if (this.autoData) {
        mobx.autorun(() => {
          this.setData(this.autoData.call(this))
        })
      }
      const computed = this.computed
      if (computed) {
        for (const key in computed) {
          mobx.autorun(() => {
            this.setData({
              [key]: computed[key].call(this)
            })
          })
        }
      }
      if (page.onLoad) {
        page.onLoad.call(this)
      }
    }
  }))
}
