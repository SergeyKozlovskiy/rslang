import { Text } from './../types/enums';
import { IRespSignIn } from "../types/types";

export const getUserInfo = (): IRespSignIn | null => {
  const info: string | null = localStorage.getItem(Text.localStorageParam);
  if (typeof(info) === 'string') {
    return JSON.parse(info);
  }

  return null;
} 