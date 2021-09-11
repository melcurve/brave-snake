import { ActionConfig } from "../actions/action";
import { SET_SPEED, SET_YARD } from "../actions/game-config-action";

const initState = {
  /** 庭院尺寸 */
  yardSize: 50 as number,

  /** 游戏速度 */
  gameSpeed: 100 as number,
};

export const gameConfigReducer = (state = initState, action: ActionConfig) => {
  switch (action.type) {
    case SET_YARD: return { ...state, yardSize: action.payload };
    case SET_SPEED: return { ...state, gameSpeed: action.payload };
    default: return state;
  }
};
