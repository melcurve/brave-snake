import { getId } from "../../utils/common";
import { ActionConfig } from "../actions/action";
import { ADD_USER, DELETE_USER, UserItem } from "../actions/user-action";

const initState = {
  /** 用户列表 */
  userList: [] as UserItem[],
};

export const userReducer = (state = initState, action: ActionConfig) => {
  let userList = state.userList;

  switch (action.type) {
    case ADD_USER: {
      let newUser: UserItem = {
        id: getId(),
        name: action.payload,
        highScore: 0,
      };
      userList.push(newUser);
      return { ...state, userList };
    }

    case DELETE_USER: {
      let index = userList.findIndex((item) => item.id === action.payload);
      userList.splice(index, 1);
      return { ...state, userList };
    }

    default: return state;
  }
};
