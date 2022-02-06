import { IAction } from "../types/types";
import initialState from "./initialState";

export const loginReducer = (state = initialState, action: IAction) => {
  switch(action.type) {
    case 'CREATE_USER':
      return {...state, userInfo: {...state.userInfo, ...action.value}, IsLogin: true};
    case 'LOGOUT_USER':
      return {...state, userInfo: {...state.userInfo, ...initialState.userInfo}, IsLogin: false};
    default:
      return state;
  }
}
