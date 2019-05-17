
import omit from 'lodash.omit'
import Toast from 'components/toast'
import { getGeolocation, getEntry, getBanner, getShopList } from '../api'

const UPDATE = 'HOME_UPDATE'

const initState = {
  init: false,
  topBarShrink: false,
  locationInfo: {},
  banner: [],
  entry: [],
  shoplist: [],
  rank_id: undefined,
}

export const home = (state = initState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export const homeUpdate = (params) => {
  return {
    payload: params,
    type: UPDATE,
  }
}

export const homeInit = () => {
  return async (dispatch, getState) => {
    const { init } = getState().home
    let { locationInfo } = getState().home
    if (init) return
    try {
      // 定理位置
      if (!locationInfo.latitude && !locationInfo.longitude) {
        const geoInfo = await getGeolocation()
        dispatch(homeUpdate({ locationInfo: geoInfo.data }))
        locationInfo = geoInfo.data      // eslint-disable-line
      }
      const location = { ...omit(locationInfo, ['address']) }
      // 获取banner entry
      const [banner, entry, list] = await Promise.all([
        getBanner(location),
        getEntry(location),
        getShopList({
          ...location,
          terminal: 'h5',
          offset: 0,
          limit: 8,
          extra_filters: 'home',
          extras: ['activities', 'tags'],
          rank_id: '',
        }),
      ])
      dispatch(homeUpdate({
        banner: banner.data,
        entry: entry.data,
        shoplist: list.data.items,
        rank_id: list.data.meta.rank_id,
        init: true,
      }))
    } catch ({ err }) {
      Toast.info(err, 3, false)
    }
  }
}

export const homeList = (callback) => {
  return async (dispatch, getState) => {
    const { rank_id, locationInfo, shoplist } = getState().home         // eslint-disable-line
    const location = { ...omit(locationInfo, ['address']) }
    try {
      const list = await getShopList({
        ...location,
        rank_id: rank_id,           // eslint-disable-line
        terminal: 'h5',
        offset: shoplist.length,
        limit: 8,
        extra_filters: 'home',
        extras: ['activities', 'tags'],
      })
      dispatch(homeUpdate({
        shoplist: [...shoplist, ...list.data.items],
        rank_id: list.data.meta.rank_id,
      }))
      callback && callback()       // eslint-disable-line
    } catch ({ err }) {
      Toast.info(err, 3, false)
    }
  }
}
