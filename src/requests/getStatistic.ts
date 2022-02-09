import store from "../store/store";
import { getNewToken } from "./getNewToken";
import { API } from "../types/enums";
import { IStatistic } from "../types/types";

export const getStatistic = async (): Promise<IStatistic> => {
  try {
    return await fetch(`${API.URL}${API.Users}/${store.getState().userInfo.userId}/${API.Statistics}`, {
      headers: {
        Authorization: `Bearer ${store.getState().userInfo.token}`
      }
    }).then(resp => resp.json());
  } catch {
    getNewToken();
    return getStatistic();
  }
}