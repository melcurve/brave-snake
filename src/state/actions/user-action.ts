import { ActionConfig } from "./action";

export interface UserItem {
  id: string;
  name: string;
  highScore: number;
}

/** 添加用户 */
export const ADD_USER = 'ADD_USER';
export const addUser = (name: string): ActionConfig => {
  return {
    type: ADD_USER,
    payload: name,
  };
};

/** 添加用户 */
export const DELETE_USER = 'DELETE_USER';
export const deleteUser = (id: number): ActionConfig => {
  return {
    type: DELETE_USER,
    payload: id,
  };
};