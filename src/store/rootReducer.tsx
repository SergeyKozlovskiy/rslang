import { deleteUserInfo } from "../localStorage/deleteUserInfo";
import { saveUserInfo } from "../localStorage/saveUserInfo";
import { IAction } from "../types/types";
import initialState from "./initialState";
import { Actions } from "../types/enums";

export const loginReducer = (state = initialState, action: IAction) => {
  switch(action.type) {
    case Actions.CREATE_USER:
      saveUserInfo(action.value);
      return {...state, userInfo: {...state.userInfo, ...action.value}, IsLogin: true};
    case Actions.LOGOUT_USER:
      deleteUserInfo();
      return {...state, userInfo: {...state.userInfo, ...initialState.userInfo}, IsLogin: false};
    case 'LOAD_WORDS':
      return {...state, userInfo: {...state.userInfo, ...state.userInfo}, IsLogin: state.IsLogin, isWordsLoad: true};
    case 'UNLOAD_WORDS':
      return {...state, userInfo: {...state.userInfo, ...state.userInfo}, IsLogin: state.IsLogin, isWordsLoad: false};
    default:
      return state;
  }
}
