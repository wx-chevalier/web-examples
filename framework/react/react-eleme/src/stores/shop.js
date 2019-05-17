

import Toast from 'components/toast'
import { getShopInfo, getShopRatings, getShopFood, getRatingTags, getRatingScores } from '../api'

const UPDATE = 'SHOP_UPDATE'

const initState = {
  loading: true,
  info: {},
  menu: [],
  tags: [],
  tagIndex: '',
  foodMenuIndex: 0,
  ratings: [],
  restaurant_id: null,
}

export const shop = (state = initState, action) => {
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

export const shopUpdate = (params) => {
  return {
    payload: params,
    type: UPDATE,
  }
}

export const shopDestroy = () => {
  return {
    payload: initState,
    type: UPDATE,
  }
}

export const shopInit = (params) => {
  return async (dispatch) => {
    const { restaurant_id } = params
    try {
      const [info, menu, ratings, tags, scores] = await Promise.all([
        getShopInfo({
          ...params,
          terminal: 'h5',
          extras: ['activities', 'albums', 'license', 'identification', 'qualification'],
        }),
        getShopFood({ restaurant_id }),
        getShopRatings({
          restaurant_id,
          has_content: true,
          offset: 0,
          limit: 8,
        }),
        getRatingTags({ restaurant_id }),
        getRatingScores({ restaurant_id }),
      ])
      dispatch(shopUpdate({
        restaurant_id,
        loading: false,
        info: info.data,
        menu: menu.data,
        ratings: ratings.data,
        tags: tags.data,
        tagIndex: tags.data.length ? tags.data[0].name : '',
        scores: scores.data,
      }))
    } catch ({ err }) {
      Toast.info(err, 3, false)
    }
  }
}

export const changeRatingTag = (params) => {
  return async (dispatch, getState) => {
    const { restaurant_id } = getState().shop
    Toast.loading('加载中...', 0)
    try {
      const { data } = await getShopRatings({
        restaurant_id,
        has_content: true,
        tag_name: params,
        offset: 0,
        limit: 8,
      })
      dispatch(shopUpdate({
        ratings: data,
        tagIndex: params,
      }))
      setTimeout(() => Toast.hide(), 400)
    } catch ({ err }) {
      Toast.info(err, 3, false)
    }
  }
}
