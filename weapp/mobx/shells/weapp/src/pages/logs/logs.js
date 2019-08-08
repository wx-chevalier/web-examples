//logs.js
var util = require('../../utils/util.js')
// import timerView from 'store/timerView'
// import mobx from 'mobx'

Page({
  data: {
    logs: [],
    a: 'asd'
  },
  onLoad: function() {
    // mobx.autorun(() => {
    //   console.log('asd')
    //   this.setData({
    //     a: timerView.timer + 'asd'
    //   })
    // })
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function(log) {
        return util.formatTime(new Date(log))
      })
    })
  }
})
