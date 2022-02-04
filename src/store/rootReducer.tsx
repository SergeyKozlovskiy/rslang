import { IAction } from "../types/types";
import initialState from "./initialState";

export const loginReducer = (state = initialState, action: IAction) => {
  switch(action.type) {
    case 'CREATE_USER':
      return {...state, userInfo: {...state.userInfo, ...action.value}};
    case 'LOGIN_USER':
      return {...state, userLogin: false};
    default:
      return state;
  }
}
