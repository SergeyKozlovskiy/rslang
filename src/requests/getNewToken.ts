import { saveUserInfo } from '../localStorage/saveUserInfo';
import store from '../store/store';
import { API } from '../types/enums';

export const getNewToken = async () => {
  const state = store.getState();
  await fetch(`${API.URL}${API.Users}/${store.getState().userInfo.userId}/${API.Tokens}`, {
    headers: {
      Authorization: `Bearer ${store.getState().userInfo.refreshToken}`
    }
  }).then(data => data.json()).then(data => {
    store.getState().userInfo.token = data.token;
    store.getState().userInfo.refreshToken = data.refreshToken;
    saveUserInfo({
      message: state.userInfo.message,
      token: data.token,
      refreshToken: data.refreshToken,
      userId: state.userInfo.userId,
      name: state.userInfo.name
    });
  });
}