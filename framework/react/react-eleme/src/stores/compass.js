
import Toast from 'components/toast'
import { getRecommendation, getGeolocation } from '../api'
import { homeUpdate } from './home'

const UPDATE = 'COMPASS_UPDATE'

const initState = {
  init: false,
  foodList: [],
  rank_id: undefined,
}

export const compass = (state = initState, action) => {
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

export const compassUpdate = (params) => {
  return {
    payload: params,
    type: UPDATE,
  }
}

export const fetchFoodList = () => {
  return async (dispatch, getState) => {
    const { foodList, rank_id } = getState().compass
    let { locationInfo } = getState().home
    if (!locationInfo.latitude && !locationInfo.longitude) {
      try {
        const { data } = await getGeolocation()
        if (data) {
          locationInfo = data
          dispatch(homeUpdate({
            locationInfo: data,
          }))
        }
      } catch ({ err }) {
        return Toast.info(err)
      }
    }
    try {
      const { data } = await getRecommendation({
        rank_id,
        limit: 20,
        offset: foodList.length,
        latitude: locationInfo.latitude,
        longitude: locationInfo.longitude,
      })
      dispatch(compassUpdate({
        init: true,
        rank_id: data.rank_id,
        foodList: [...foodList, ...data.items],
      }))
    } catch ({ err }) {
      return Toast.info(err)
    }
  }
}
