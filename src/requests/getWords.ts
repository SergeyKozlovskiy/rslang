import { API } from '../types/enums';
import { WordsType } from '../types/types';

export const getWords = async (group: number, page: number): Promise<Array<WordsType>> => {
  return await fetch(`${API.URL}${API.Words}?group=${group}&page=${page}`).then(
    (response: Response) => response.json()
  );
};
