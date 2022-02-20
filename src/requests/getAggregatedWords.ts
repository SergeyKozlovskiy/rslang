import { API } from '../types/enums';
import store from '../store/store';
import { getNewToken } from './getNewToken';
import { DictionaryStateType } from '../types/types';

export const getAggregatedWords = async (difficulty: string, dispatch?: Function): Promise<Array<DictionaryStateType> | undefined> => {
  try {
    return await fetch(`${API.URL}${API.Users}/${store.getState().userInfo.userId}/${API.AggregatedWords}?filter={"$or":[{"userWord.difficulty":"${difficulty}"}]}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${store.getState().userInfo.token}`
      }
    })
    .then(data => data.json());
  } catch {
    await getNewToken(dispatch);
    getAggregatedWords(difficulty);
  }
}