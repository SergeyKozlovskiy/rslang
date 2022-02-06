import { ICreateUser, IRespSignIn, IPostSignIn } from "../types/types";
import { postUser } from '../requests/postUser';
import { createUserAction } from "./actions";
import { signIn } from "../requests/signIn";

export const createUser = () => {
  const unRegPopup = document.querySelector('.registration-popup') as HTMLDivElement;
  const nameInput = document.querySelector('.authorization-name') as HTMLInputElement;
  const emailInput = document.querySelector('.authorization-email') as HTMLInputElement;
  const passwordInput = document.querySelector('.authorization-password') as HTMLInputElement;
  const body: ICreateUser = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value
  }

  return async (dispatch: Function) => {
    await postUser(body)
    .then((resp: Response) => {
      if(resp.ok) {
        signIn({email: body.email, password: body.password})
        .then((resp: Response) => resp.json())
        .then((userInfo: IRespSignIn) => dispatch(createUserAction(userInfo)));
      } else {
        unRegPopup.classList.add('popup-active');
        setTimeout(() => {
          unRegPopup.classList.remove('popup-active');
        }, 2000);
      }
    });
  }
};

export const signInUser = () => {
  const unLogPopup = document.querySelector('.login-popup') as HTMLDivElement;
  const emailInput = document.querySelector('.authorization-email') as HTMLInputElement;
  const passwordInput = document.querySelector('.authorization-password') as HTMLInputElement;
  const body: IPostSignIn = {
    email: emailInput.value,
    password: passwordInput.value
  }

  return async (dispatch: Function) => {
    signIn(body)
    .then((resp: Response) => {
      if(resp.ok) {
        resp.json().then((userInfo: IRespSignIn) => dispatch(createUserAction(userInfo)));
      } else {
        unLogPopup.classList.add('popup-active');
        setTimeout(() => {
          unLogPopup.classList.remove('popup-active');
        }, 2000);
      }
    });
  }
}