
const isWeapp = typeof wx !== 'undefined'

export function showToast(content) {
  if (isWeapp) {
    wx.showModal({
      title: '提示',
      content
    })
  } else {
    alert(content)
  }
}
