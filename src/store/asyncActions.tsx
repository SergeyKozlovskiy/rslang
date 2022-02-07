import { ICreateUser, IRespSignIn, IPostSignIn } from "../types/types";
import { postUser } from '../requests/postUser';
import { createUserAction } from "./actions";
import { signIn } from "../requests/signIn";
import { Classes } from '../types/enums';

export const createUser = () => {
  const unRegPopup = document.querySelector(`.${Classes.regPopup}`) as HTMLDivElement;
  const nameInput = document.querySelector(`.${Classes.nameInput}`) as HTMLInputElement;
  const emailInput = document.querySelector(`.${Classes.emailInput}`) as HTMLInputElement;
  const passwordInput = document.querySelector(`.${Classes.passInput}`) as HTMLInputElement;
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
        unRegPopup.classList.add(`${Classes.activePopup}`);
        setTimeout(() => {
          unRegPopup.classList.remove(`${Classes.activePopup}`);
        }, 2000);
      }
    });
  }
};

export const signInUser = () => {
  const unLogPopup = document.querySelector(`.${Classes.logPopup}`) as HTMLDivElement;
  const emailInput = document.querySelector(`.${Classes.emailInput}`) as HTMLInputElement;
  const passwordInput = document.querySelector(`.${Classes.passInput}`) as HTMLInputElement;
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
        unLogPopup.classList.add(`${Classes.activePopup}`);
        setTimeout(() => {
          unLogPopup.classList.remove(`${Classes.activePopup}`);
        }, 2000);
      }
    });
  }
}