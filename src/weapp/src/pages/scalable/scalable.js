//index.js
import { UserEntity } from '../../bridge.bundle';

let userEntity = new UserEntity();

//获取应用实例
var app = getApp()
Page({
  data: {
    motto: userEntity.name,
    userInfo: {}

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')

    //尝试请求远程地址
    wx.request({
      url: 'https://app.truelore.cn', //仅为示例，并非真实的接口地址
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })

    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
