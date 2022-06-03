import { API } from '../types/enums';
import store from '../store/store';
import { getNewToken } from './getNewToken';
import { DictionaryStateType } from '../types/types';
import { Dispatch } from 'react';

export const getAggregatedWords = async (
  difficulty: string,
  dispatch?: Dispatch<() => void>
): Promise<Array<DictionaryStateType> | undefined> => {
  try {
    return await fetch(
      `${API.URL}${API.Users}/${store.getState().userInfo.userId}/${
        API.AggregatedWords
      }?filter={"$or":[{"userWord.difficulty":"${difficulty}"}]}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${store.getState().userInfo.token}`,
        },
      }
    ).then((data) => data.json());
  } catch {
    await getNewToken(dispatch);
    getAggregatedWords(difficulty);
  }
};
