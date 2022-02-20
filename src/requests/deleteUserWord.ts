import store from "../store/store";
import { API } from "../types/enums";
import { getNewToken } from "./getNewToken";

export const deleteUserWord = async (wordId: string, dispatch?: Function) => {
  await fetch(`${API.URL}${API.Users}/${store.getState().userInfo.userId}/${API.Words}/${wordId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'appLication/json',
      Authorization: `Bearer ${store.getState().userInfo.token}`
    },
  })
  .then((data: Response) => {
    if(data.status !== 204) {
    getNewToken(dispatch);
    deleteUserWord(wordId);
    }
  })
}