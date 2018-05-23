function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1]
    ? n
    : '0' + n
}
function mapActions(actions) {
  return objectMap(actions, action => (...args) => action(...args))
}

/**
 * 对象map方法
 * @param  {Object}   obj
 * @param  {Function} cb  原数组中的元素经过该方法后返回一个新的元素。
 *      currentValue
 *          callback 的第一个参数，数组中当前被传递的元素。
 *      index
 *          callback 的第二个参数，数组中当前被传递的元素的索引。
 *      obj
 *          callback 的第三个参数，调用 map 方法的对象。
 * @return {Object}
 */
export function objectMap(obj, cb) {
  const hasOwn = Object.prototype.hasOwnProperty
  const newObj = {}
  for (const index in obj) {
    if (hasOwn.call(obj, index)) {
      newObj[index] = cb.call(obj, obj[index], index, obj)
    }
  }
  return newObj
}
module.exports = {
  formatTime: formatTime,
  mapActions
}
