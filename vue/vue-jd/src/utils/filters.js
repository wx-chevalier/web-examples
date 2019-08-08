/**
 * 按需全局化过滤器
 * 您还可以在组件定义时的 filters 属性中按需引入
 */
// 定义方法：Vue.filter({name}, function(value){...})

import Vue from 'vue'

Vue.filter('imageUrl', function (json) { //获取第一个文件路径
  if (json == undefined || json == null) return;
  try {
    var fileArr = JSON.parse(json);
    return fileArr[0].FilePath;
  } catch (e) {
    return '';
  }
})

Vue.filter('DateFormat', function (date, fmt) { //格式化时间   DateFormat('yyyy-MM-dd hh:mm')
  if (date == undefined || date == null) return;
  date = new Date(date);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  function padLeftZero (str) {
    return ('00' + str).substr(str.length)
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
})

Vue.filter('firstFilePath', function (json) { //获取第一个文件路径
  if (json == undefined || json == null) return;
  try {
    var fileArr = JSON.parse(json);
    return fileArr[0].FilePath;
  } catch (e) {
    return '';
  }
})

Vue.filter('firstFilePathList', function (json) { //获取多个文件路径
  if (json == undefined || json == null) return;
  try {
    var fileList = JSON.parse(json);
    var fileArr = [];
    for (var i = 0; i < fileList.length; i++) {
      fileArr.push(fileList[i].FilePath)
    }
    return fileArr;
  } catch (e) {
    return '';
  }
})

Vue.filter('Interception', function (json, maxlength) { //截取字符串
  if (json == undefined || json == null) return;
  try {
    var Stringstr = json.toString();
    return Stringstr.length > maxlength ? Stringstr.substring(0, maxlength) : Stringstr
  } catch (e) {
    return '';
  }
})
