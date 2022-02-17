import { IStatistic, IStatisticBody } from "../types/types";
import store from '../store/store';
import { getNewToken } from "./getNewToken";
import { API, RequestStatistic } from '../types/enums';
import { getStatistics } from "../localStorage/getStatistics";

const initialStatistic: IStatisticBody = {
  gameLernedWords: 0,
  persent: 0,
  wins: 0
}

export const putStatistic = async (body: IStatisticBody, game: string): Promise<void> => {
  const gameName: string = game;
  const gameBody: IStatisticBody = body;
  let localStatistic: IStatisticBody | null;
  let requestBody: IStatistic;

  if (game === RequestStatistic.sprint) {
    localStatistic = getStatistics(RequestStatistic.audioChalenge);
    if (localStatistic !== null) {

      requestBody = {
        learnedWords: localStatistic.gameLernedWords + gameBody.gameLernedWords,
        optional: {
          sprint: gameBody,
          audioChalange: localStatistic
        }
      }

    } else {

      requestBody = {
        learnedWords: initialStatistic.gameLernedWords + gameBody.gameLernedWords,
        optional: {
          sprint: gameBody,
          audioChalange: initialStatistic
        }
      }

    }
  } else {

    localStatistic = getStatistics(RequestStatistic.sprint);
    if (localStatistic !== null) {

      requestBody = {
        learnedWords: localStatistic.gameLernedWords + gameBody.gameLernedWords,
        optional: {
          sprint: localStatistic,
          audioChalange: gameBody
        }
      }

    } else {

      requestBody = {
        learnedWords: initialStatistic.gameLernedWords + gameBody.gameLernedWords,
        optional: {
          sprint: initialStatistic,
          audioChalange: gameBody
        }
      }

    }
  }


  try {
    await fetch(`${API.URL}${API.Users}/${store.getState().userInfo.userId}/${API.Statistics}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'appLication/json',
        Authorization: `Bearer ${store.getState().userInfo.token}`
      },
      body: JSON.stringify(requestBody),
    })
    .then(data => data.json());
  } catch {
    getNewToken();
    putStatistic(gameBody, gameName);
  }
}