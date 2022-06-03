import { IStatisticBody } from '../types/types';
import store from '../store/store';
import { getNewToken } from './getNewToken';
import { API } from '../types/enums';
import { generateBodyForStatistic } from '../functions/generateBodyForStatistic';
import { Dispatch } from 'react';

export const putStatistic = async (
  body: IStatisticBody,
  game: string,
  dispatch?: Dispatch<() => void>
): Promise<void> => {
  const stat: IStatisticBody = body;
  generateBodyForStatistic(body, game, dispatch).then(async (data) => {
    try {
      fetch(`${API.URL}${API.Users}/${store.getState().userInfo.userId}/${API.Statistics}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'appLication/json',
          Authorization: `Bearer ${store.getState().userInfo.token}`,
        },
        body: JSON.stringify(data),
      }).then((data) => data.json());
    } catch {
      await getNewToken(dispatch);
      putStatistic(stat, game);
    }
  });
};
