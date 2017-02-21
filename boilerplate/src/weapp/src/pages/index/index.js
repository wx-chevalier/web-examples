//index.js
import { UserEntity, FluentFetcher } from '../../bridge.bundle';

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

    console.log('onLoad');

    let fluentFetcher = new FluentFetcher({});

    fluentFetcher.get('/list').mock({'/list': {test: "data"}}).build().then((data) => {
      console.log(data);
    });

    var that = this;

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
