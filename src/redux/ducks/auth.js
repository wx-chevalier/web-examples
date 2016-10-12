import { login } from '../../react/api/auth';
/**
 * Created by apple on 16/10/11.
 */
export const LOGIN_REQUEST = 'LOGIN_REQUEST';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';

//默认的初始状态
const initialState = {
  userToken: null,
  loading: false,
  error: null,
  shouldRedirect: false
};

/**
 * @function 默认的authReducer
 * @param state
 * @param action
 */
export default function (state = initialState, {type, ...rest}) {

  switch (type) {

    //发起登录请求
    case LOGIN_REQUEST: {
      return {...state, loading: true};
    }


    //登录成功
    case LOGIN_SUCCESS: {
      return {...state, loading: false, userToken: rest.result, shouldRedirect: true}
    }

    //登录失败
    case LOGIN_FAILURE: {
      return {...state, loading: false, error: rest.error, shouldRedirect: false}
    }

    //登出操作
    case LOGOUT: {
      return {
        ...state, userToken: undefined, shouldRedirect: true
      }
    }

    default:
      return state;
  }

};

/**
 * @region Action Creators
 */

export const doLogin = ()=> {

  //返回某个Promise对象
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    promise: login()
  }

};

export const doLogout = ()=> {

  return {
    type: LOGOUT
  }
}