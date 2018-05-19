import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import enthusiasm from '../reducer/';

export interface StoreState {
  languageName: string;
  enthusiasmLevel: number;
}

const middleware = [thunk];

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default createStoreWithMiddleware<StoreState>(enthusiasm, {
  enthusiasmLevel: 1,
  languageName: 'TypeScript'
});
