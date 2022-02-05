import { ICreateUser, IRespSignIn } from "../types/types";
import { postUser } from '../requests/postUser';
import { createUserAction } from "./actions";
import { signIn } from "../requests/signIn";

export const createUser = () => {
  const nameInput = document.querySelector('.authorization-name') as HTMLInputElement;
  const emailInput = document.querySelector('.authorization-email') as HTMLInputElement;
  const passwordInput = document.querySelector('.authorization-password') as HTMLInputElement;

  const body: ICreateUser = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value
  }

  return async (dispatch: Function) => {
    await postUser(body);
    signIn({email: body.email, password: body.password})
    .then((resp: Response) => resp.json())
    .then((userInfo: IRespSignIn) => dispatch(createUserAction(userInfo)));
  }
};