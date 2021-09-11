import { ActionConfig } from "./action";

/** 设置庭院尺寸 */
export const SET_YARD = 'SET_YARD';
export const setYard = (size: number): ActionConfig => {
  return {
    type: SET_YARD,
    payload: size,
  };
};

/** 设置游戏速度 */
export const SET_SPEED = 'SET_SPEED';
export const setSpeed = (speed: number): ActionConfig => {
  return {
    type: SET_SPEED,
    payload: speed,
  };
};