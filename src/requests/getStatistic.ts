import store from "../store/store";
import { getNewToken } from "./getNewToken";
import { API } from "../types/enums";
import { IStatistic } from "../types/types";

export const getStatistic = async (): Promise<IStatistic | null> => {
  return await fetch(`${API.URL}${API.Users}/${store.getState().userInfo.userId}/${API.Statistics}`, {
    headers: {
      Authorization: `Bearer ${store.getState().userInfo.token}`
    }
  }).then(resp => {
    if(resp.status === 404) {
      return null
    } else {
      return resp.json();
    }
  });
}