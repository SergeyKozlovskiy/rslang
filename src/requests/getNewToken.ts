import { saveUserInfo } from '../localStorage/saveUserInfo';
import store from '../store/store';
import { API } from '../types/enums';
import { signInUser } from '../store/asyncActions';
import { getuserPass } from '../localStorage/getUserPass';
import { IPostSignIn } from '../types/types';

export const getNewToken = async (dispatch?: Function) => {
  const state = store.getState();
  try {
      await fetch(`${API.URL}${API.Users}/${store.getState().userInfo.userId}/${API.Tokens}`, {
      headers: {
        Authorization: `Bearer ${store.getState().userInfo.refreshToken}`
      }
    })
    .then(data => {
      return data.json();
    })
    .then(data => {
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
  } catch {
    if(dispatch) {
      const userPass: IPostSignIn | null = getuserPass();
      if(userPass) {
        dispatch(signInUser(userPass));
      }
    }
  }
}