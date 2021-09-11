import { combineReducers } from "redux";
import { gameConfigReducer } from "./game-config-reducer copy";
import { userReducer } from "./user-reducer";

const REDUCERS = {
  gameConfigReducer,
  userReducer,
};

export const reducers = combineReducers(REDUCERS);