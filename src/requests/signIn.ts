import { IPostSignIn } from "../types/types"
import store from '../store/store';

export const signIn = async (body: IPostSignIn): Promise<Response> => {
  const response: Response = await fetch('http://localhost:5000/signin', {
    method: 'POST',
    headers: {
      'Content-type': 'appLication/json'
    },
    body: JSON.stringify(body)
  });
  return response;
}