import { Actions } from "../types/enums";
import { IAction, ICreateUser } from "../types/types";

export const createUserAction = (value: ICreateUser): IAction => ({type: Actions.CREATE_USER, value: value});