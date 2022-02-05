import { ICreateUser } from '../types/types';
export const postUser = async (body: ICreateUser): Promise<Response> => {
  const response: Response = await fetch('http://localhost:5000/users', {
    method: 'POST',
    headers: {
      'Content-type': 'appLication/json'
    },
    body: JSON.stringify(body)
    });
  return response;
}