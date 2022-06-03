import { putWord } from './putWord';
import { API, WordsDifficult, RequestResponseCode } from '../types/enums';
import store from '../store/store';
import { WordsHardOrLernType, WordsType } from '../types/types';
import { getNewToken } from './getNewToken';
import { Dispatch } from 'react';

export const postWord = async (
  word: WordsType,
  difficult: string,
  dispatch?: Dispatch<() => void>
): Promise<void> => {
  let body: WordsHardOrLernType;

  if (difficult === WordsDifficult.hard) {
    body = {
      difficulty: WordsDifficult.hard,
      optional: word,
    };
  } else {
    body = {
      difficulty: WordsDifficult.lern,
      optional: word,
    };
  }

  await fetch(
    `${API.URL}${API.Users}/${store.getState().userInfo.userId}/${API.Words}/${word.id}`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'appLication/json',
        Authorization: `Bearer ${store.getState().userInfo.token}`,
      },
      body: JSON.stringify(body),
    }
  ).then(async (data: Response) => {
    if (data.status === RequestResponseCode.DATA_ALREDY_EXISTS) {
      putWord(body, dispatch);
    } else if (data.status === RequestResponseCode.ACCESS_TOKEN_IS_MISSING_OR_INVALID) {
      await getNewToken(dispatch);
      postWord(word, difficult);
    }
  });
};
