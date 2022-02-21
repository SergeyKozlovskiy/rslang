import { IStatistic, IStatisticBody } from "../types/types";
import store from '../store/store';
import { getNewToken } from "./getNewToken";
import { API, RequestStatistic } from '../types/enums';
import { getStatistic } from "./getStatistic";
import { generateBodyForStatistic } from "../functions/generateBodyForStatistic";

export const putStatistic = async (body: IStatisticBody, game: string): Promise<void> => {
  generateBodyForStatistic(body, game).then(data => {
    try {
      fetch(`${API.URL}${API.Users}/${store.getState().userInfo.userId}/${API.Statistics}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'appLication/json',
          Authorization: `Bearer ${store.getState().userInfo.token}`
        },
        body: JSON.stringify(data),
      })
      .then(data => data.json());
    } catch {
      getNewToken();
      /* putStatistic(stat, game); */
    }
  })
}