import { Actions } from "../types/enums";
import { IAction, IRespSignIn } from "../types/types";

export const createUserAction = (value: IRespSignIn): IAction => ({type: Actions.CREATE_USER, value: value});
export const logoutUserAction = () => ({type: Actions.LOGOUT_USER});
export const loadWordsAction = () => ({type: 'LOAD_WORDS'});
export const unLoadWordsAction = () => ({type: 'UNLOAD_WORDS'});