export function formatDate(date, fmt) {
  //匹配年字符串，若可以匹配，则执行替换
  if (/(y+)/.test(fmt)) {
    //将yyyy替换为真实年份，substr是为了年份可以以不同长度显示
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '')).substr(4 - RegExp.$1.length);
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  //遍历匹配月、日、时、分、秒，并替换
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
//数字为单数时，在前面补零
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
