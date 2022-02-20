import { signInUser } from './../store/asyncActions';
import { API } from '../types/enums';
import store from '../store/store';
import { getNewToken } from './getNewToken';

export const getAggregatedWords = async (difficulty: string, dispatch?: Function) => {
  try {
    return await fetch(`${API.URL}${API.Users}/${store.getState().userInfo.userId}/aggregatedWords?filter={"$or":[{"userWord.difficulty":"${difficulty}"}]}`, {
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