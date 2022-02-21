import { API } from '../types/enums';
import { ICreateUser } from '../types/types';
export const postUser = async (body: ICreateUser): Promise<Response> => {
  const response: Response = await fetch(`${API.URL}${API.Users}`, {
    method: 'POST',
    headers: {
      'Content-type': 'appLication/json'
    },
    body: JSON.stringify(body)
    });
  return response;
}