import { IStatistic, IStatisticBody } from "../types/types";
import { getStatistic } from "../requests/getStatistic";
import { RequestStatistic } from "../types/enums";

export const generateBodyForStatistic = async (body: IStatisticBody, game: string) => {
  let requestBody: IStatistic;
  return getStatistic().then((data: IStatistic | null) => {
    if(data === null) {
      if(game === RequestStatistic.sprint) {
        return requestBody = {
          learnedWords: body.corectAnswers,
          optional: {
            sprint: body
          }
        }
      } else {
        return requestBody = {
          learnedWords: body.corectAnswers,
          optional: {
            audioChalange: body
          }
        }
      }

    } else {

      if(game === RequestStatistic.sprint) {

        if(data.optional.sprint?.lastActivity === body.lastActivity || data.optional.audioChalange?.lastActivity === body.lastActivity) {
          if(data.optional.sprint && data.optional.audioChalange) {
            console.log('dick')
            return requestBody = {
              learnedWords: data.learnedWords + body.corectAnswers,
              optional: {
                sprint: {
                  lastActivity: body.lastActivity,
                  corectAnswers: data.optional.sprint.corectAnswers + body.corectAnswers,
                  persent: body.persent,
                  wins: body.wins
                },
                audioChalange: data.optional.audioChalange
              }
            }
          } else if(data.optional.sprint) {
            return requestBody = {
              learnedWords: data.learnedWords + body.corectAnswers,
              optional: {
                sprint: {
                  lastActivity: body.lastActivity,
                  corectAnswers: data.optional.sprint.corectAnswers + body.corectAnswers,
                  persent: body.persent,
                  wins: body.wins
                }
              }
            }
          } else {
            return requestBody = {
              learnedWords: data.learnedWords + body.corectAnswers,
              optional: {
                sprint: body,
                audioChalange: data.optional.audioChalange
              }
            }
          }

        } else {

          if(data.optional.sprint && data.optional.audioChalange) {
            return requestBody = {
              learnedWords: body.corectAnswers,
              optional: {
                sprint: {
                  lastActivity: body.lastActivity,
                  corectAnswers: body.corectAnswers,
                  persent: body.persent,
                  wins: body.wins
                },
                audioChalange: data.optional.audioChalange
              }
            }
          } else if(data.optional.sprint) {
            return requestBody = {
              learnedWords: body.corectAnswers,
              optional: {
                sprint: {
                  lastActivity: body.lastActivity,
                  corectAnswers: body.corectAnswers,
                  persent: body.persent,
                  wins: body.wins
                }
              }
            }
          } else {
            return requestBody = {
              learnedWords: body.corectAnswers,
              optional: {
                sprint: body,
                audioChalange: data.optional.audioChalange
              }
            }
          }

        }

      } else {
        if(data.optional.sprint?.lastActivity === body.lastActivity || data.optional.audioChalange?.lastActivity === body.lastActivity) {
          if(data.optional.sprint && data.optional.audioChalange) {
            return requestBody = {
              learnedWords: data.learnedWords + body.corectAnswers,
              optional: {
                sprint: data.optional.sprint,
                audioChalange: {
                  lastActivity: body.lastActivity,
                  corectAnswers: data.optional.audioChalange.corectAnswers + body.corectAnswers,
                  persent: body.persent,
                  wins: body.wins
                }
              }
            }
          } else if(data.optional.sprint) {
            return requestBody = {
              learnedWords: data.learnedWords + body.corectAnswers,
              optional: {
                sprint: data.optional.sprint,
                audioChalange: body
              }
            }
          } else {
            return requestBody = {
              learnedWords: data.learnedWords + body.corectAnswers,
              optional: {
                audioChalange: body
              }
            }
          }

        } else {

          if(data.optional.sprint && data.optional.audioChalange) {
            return requestBody = {
              learnedWords: body.corectAnswers,
              optional: {
                sprint: data.optional.sprint,
                audioChalange: body
              }
            }
          } else if(data.optional.sprint) {
            return requestBody = {
              learnedWords: body.corectAnswers,
              optional: {
                sprint: data.optional.sprint,
                audioChalange: body
              }
            }
          } else {
            return requestBody = {
              learnedWords: body.corectAnswers,
              optional: {
                audioChalange: body
              }
            }
          }

        }
      }

    }
  });
}