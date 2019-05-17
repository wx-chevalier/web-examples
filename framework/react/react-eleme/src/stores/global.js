
const UPDATE = 'GLOBAL_UPDATE'

const initState = {
  isLogin: false,
  userInfo: {},
}

export const globalState = (state = initState, action) => {
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

export const globalUpdate = (params) => {
  return {
    payload: params,
    type: UPDATE,
  }
}
