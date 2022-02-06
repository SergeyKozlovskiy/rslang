import { IRespSignIn } from './../types/types';

export const saveUserInfo = (userInfo: IRespSignIn): void => {
  if(userInfo !== undefined) {
    localStorage.setItem('UserInfo', JSON.stringify(userInfo));
  } else {
    return
  }
}