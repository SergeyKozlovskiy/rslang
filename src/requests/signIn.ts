import { IPostSignIn } from "../types/types";
import { API } from '../types/enums';

export const signIn = async (body: IPostSignIn): Promise<Response> => {
  const response: Response = await fetch(`${API.URL}${API.SignIn}`, {
    method: 'POST',
    headers: {
      'Content-type': 'appLication/json'
    },
    body: JSON.stringify(body)
  });
  return response;
}