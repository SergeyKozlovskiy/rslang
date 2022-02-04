import { ICreateUser } from "../types/types";
import { createUserAction } from "./actions";

export const createUser = () => {
  const nameInput = document.querySelector('.authorization-name') as HTMLInputElement;
  const emailInput = document.querySelector('.authorization-email') as HTMLInputElement;
  const passwordInput = document.querySelector('.authorization-password') as HTMLInputElement;

  const body: ICreateUser = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value
  }

  return (dispatch: Function) => {
    fetch('http://localhost:5000/users', {
    method: 'POST',
    headers: {
      'Content-type': 'appLication/json'
    },
    body: JSON.stringify(body)
    }).then((resp: Response) => resp.json()).then((user) => dispatch(createUserAction(user)));  
  }
};