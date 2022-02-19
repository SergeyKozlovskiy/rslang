import { saveUserInfo } from '../localStorage/saveUserInfo';
import store from '../store/store';
import { API } from '../types/enums';
import { signInUser } from '../store/asyncActions';

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
      console.log('dick');
      dispatch(signInUser({email: 'gnida@gmail.com', password: '20033009'}));
    }
  }
}