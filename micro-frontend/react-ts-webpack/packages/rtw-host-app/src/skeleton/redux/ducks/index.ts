import { connectRouter } from 'connected-react-router';
import { combineReducers, ReducersMapObject } from 'redux';
import { History } from 'history';

import commonReducer from './common';

export const configReducer = (partialReducers: ReducersMapObject = {}) => (history: History) =>
  combineReducers({
    common: commonReducer,
    router: connectRouter(history),
    ...partialReducers
  });
