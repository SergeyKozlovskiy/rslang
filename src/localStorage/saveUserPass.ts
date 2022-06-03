import { IPostSignIn } from '../types/types';
import { Text } from '../types/enums';

export const saveUserPass = (pass: IPostSignIn): void => {
  localStorage.setItem(Text.localStoragePassword, JSON.stringify(pass));
};
