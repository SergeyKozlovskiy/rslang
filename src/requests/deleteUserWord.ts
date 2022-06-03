import store from '../store/store';
import { API } from '../types/enums';
import { getNewToken } from './getNewToken';
import { RequestResponseCode } from '../types/enums';
import { Dispatch } from 'react';

export const deleteUserWord = async (wordId: string, dispatch?: Dispatch<() => void>) => {
  await fetch(`${API.URL}${API.Users}/${store.getState().userInfo.userId}/${API.Words}/${wordId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'appLication/json',
      Authorization: `Bearer ${store.getState().userInfo.token}`,
    },
  }).then(async (data: Response) => {
    if (data.status !== RequestResponseCode.USER_WORD_HAS_BEEN_DELETED) {
      await getNewToken(dispatch);
      deleteUserWord(wordId);
    }
  });
};
