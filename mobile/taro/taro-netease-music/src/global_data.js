const globalData = {
    topNavHeight: 0,
    currentList:{},
    currentPlaying:{},
    _userData:{},
}

export function set (key, val) {
  globalData[key] = val
}

export function get (key) {
  return globalData[key]
}