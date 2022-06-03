import { IPostSignIn } from './../types/types';
import { Text } from '../types/enums';

export const getuserPass = (): IPostSignIn | null => {
  const pass: string | null = localStorage.getItem(Text.localStoragePassword);
  if (pass) {
    return JSON.parse(pass);
  } else {
    return null;
  }
};
