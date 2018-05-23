import { store, mobx } from '../../lib/logic'
import mobxPage from '../../utils/mobxPage'
var app = getApp()

const { todos } = store
mobxPage({
  data: {
    userInfo: {},
  },
  autoData() {
    console.log('asdsad')
    return {
      todos: todos.items
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({url: '../logs/logs'})
  },
  toTodos: function() {
    wx.navigateTo({url: '../todos/todos'})
  },
  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({userInfo: userInfo})
    })
  }
})
