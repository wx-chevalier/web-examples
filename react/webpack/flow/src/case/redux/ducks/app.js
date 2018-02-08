/**
 * Created by apple on 16/10/11.
 */

/**
 * @function 本文件用于存放存放通用的Actions/ActionCreators/Reducers/Selectors
 */

/**
 * @function 通用Action Typs
 * @type {{LOAD_DATA: string, SHOW_SNACKBAR: string, HIDE_SNACKBAR: string, SHOW_DRAWER: string, HIDE_DRAWER: string}}
 */
export const types = {
  LOAD_DATA: 'APP/LOAD_DATA', // Triggers a saga that 1) makes some HTTP requests 2) updates other reducers
  SHOW_SNACKBAR: 'APP/SHOW_SNACKBAR',
  HIDE_SNACKBAR: 'APP/HIDE_SNACKBAR',
  SHOW_DRAWER: 'APP/SHOW_DRAWER',
  HIDE_DRAWER: 'APP/HIDE_DRAWER'
};

/**
 * @function 通用初始状态
 * @type {{snackbarMessage: null, isDrawerVisible: boolean}}
 */
export const initialState = {
  snackbarMessage: null,
  isDrawerVisible: false
};

/**
 * @function 默认导出Reducers
 * @param state
 * @param action
 * @return {*}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_SNACKBAR:
      return {...state, snackbarMessage: action.snackbarMessage};

    case types.HIDE_SNACKBAR:
      return {...state, isSnackbarVisible: false};

    case types.SHOW_DRAWER:
      return {...state, isDrawerVisible: true};

    case types.HIDE_DRAWER:
      return {...state, isDrawerVisible: false};
    default:
      return state
  }
}

/**
 * @function 通用的ActionCreators
 * @type {{loadData: (()=>{type: *}), showSnackbar: ((p1:*)=>{type: string, snackbarMessage: *}), hideSnackbar: (()=>{type: string}), showDrawer: (()=>{type: string}), hideDrawer: (()=>{type: string})}}
 */
export const actions = {
  loadData: () => ({type: types.LOAD_DATA_REQUEST}),
  showSnackbar: (snackbarMessage) => ({type: types.SHOW_SNACKBAR, snackbarMessage}),
  hideSnackbar: () => ({type: types.HIDE_SNACKBAR}),
  showDrawer: () => ({type: types.SHOW_DRAWER}),
  hideDrawer: () => ({type: types.HIDE_DRAWER})
};