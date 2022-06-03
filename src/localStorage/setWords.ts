import { WordsType } from './../types/types';

export const setWords = (words: Array<WordsType>): void => {
  localStorage.setItem('Words', JSON.stringify(words));
};
