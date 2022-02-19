import { putWord } from './putWord';
import { API, WordsDifficult } from "../types/enums";
import store from "../store/store";
import { WordsHardOrLernType, WordsType } from "../types/types";
import { getNewToken } from './getNewToken';

export const postWord = async (word: WordsType, difficult: string): Promise<void> => {

  let body: WordsHardOrLernType;

  if(difficult === WordsDifficult.hard) {
    body = {
      difficulty: WordsDifficult.hard,
      optional: word
    }
  } else {
    body = {
      difficulty: WordsDifficult.lern,
      optional: word
    }
  }

  await fetch(`${API.URL}${API.Users}/${store.getState().userInfo.userId}/${API.Words}/${word.id}`,{
    method: 'POST',
    headers: {
      'Content-type': 'appLication/json',
      Authorization: `Bearer ${store.getState().userInfo.token}`
    },
    body: JSON.stringify(body),
  })
  .then((data: Response) => {
    if(data.status === 417) {
      putWord(body);
    } else if(data.status === 401) {
      getNewToken();
      postWord(word, difficult);
    }
  })
}