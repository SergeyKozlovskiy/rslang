import { Text } from './../types/enums';
import { IRespSignIn } from './../types/types';

export const saveUserInfo = (userInfo: IRespSignIn): void => {
  if (userInfo !== undefined) {
    localStorage.setItem(Text.localStorageParam, JSON.stringify(userInfo));
  } else {
    return;
  }
};
