import store from "../store/store";
import { getNewToken } from "./getNewToken";
import { API, RequestResponseCode } from "../types/enums";
import { IStatistic } from "../types/types";

export const getStatistic = async (dispatch?: Function): Promise<IStatistic | null> => {
  return await fetch(`${API.URL}${API.Users}/${store.getState().userInfo.userId}/${API.Statistics}`, {
    headers: {
      Authorization: `Bearer ${store.getState().userInfo.token}`
    }
  }).then(async resp => {
    if(resp.status === RequestResponseCode.NOT_FOUND) {
      return null
    }else if(resp.status === RequestResponseCode.ACCESS_TOKEN_IS_MISSING_OR_INVALID) {
      await getNewToken(dispatch);
      getStatistic();
    } else {
      return resp.json();
    }
  });
}