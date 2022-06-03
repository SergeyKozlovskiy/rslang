import { WordsType } from '../types/types';

export const getWordsFromLocal = (): Array<WordsType> | null => {
  const words: string | null = localStorage.getItem('Words');
  if (words !== null) {
    return JSON.parse(words);
  } else {
    return null;
  }
};
