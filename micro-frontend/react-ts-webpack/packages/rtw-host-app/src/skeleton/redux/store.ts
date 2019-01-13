import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore, compose, ReducersMapObject } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

import { configReducer } from './ducks';
import { history } from '../env';

declare var isProd: boolean;
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
  }
}

const middlewares = applyMiddleware(
  routerMiddleware(history),
  promiseMiddleware(),
  thunkMiddleware
);

let enhancers = middlewares;

if (!isProd) {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  enhancers = composeEnhancers(middlewares);
}

export function configStore(initialState: object = {}) {
  const store = createStore(configReducer({})(history), initialState, enhancers);

  function appendReducer(asyncReducers: ReducersMapObject) {
    store.replaceReducer(configReducer(asyncReducers)(history));
  }

  return {
    ...store,
    appendReducer
  };
}

export default configStore();
