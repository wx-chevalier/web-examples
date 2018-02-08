import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../container/HomeContainer/reducer";

export default combineReducers({
	form: formReducer,
	homeReducer,
});
