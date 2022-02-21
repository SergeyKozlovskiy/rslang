import { getNewToken } from './getNewToken';
import { WordsHardOrLernType } from './../types/types';
import { API } from '../types/enums';
import store from '../store/store';

export const putWord = async (body: WordsHardOrLernType, dispatch?: Function): Promise<void> => {
  const putBody: WordsHardOrLernType = body;
  try {
    await fetch(`${API.URL}${API.Users}/${store.getState().userInfo.userId}/${API.Words}/${putBody.optional.id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'appLication/json',
        Authorization: `Bearer ${store.getState().userInfo.token}`
      },
      body: JSON.stringify(body),
    })
    .then((data: Response) => data.json());
  } catch {
    await getNewToken(dispatch);
    putWord(putBody);
  }
}