export type Word = {
  id: string;
  _id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
};

export type ResponseStatistics = {
  id: string;
  learnedWords: number;
  optional: {
    procCorrectAnswerAudioChallenge: number;
    procCorrectAnswerSprint: number;
    seriesCorrectAnswerAudioChallenge: number;
    seriesCorrectAnswerSprint: number;
    sumNewWordInDayAudioChallenge: number;
    sumNewWordInDaySprint: number;
  };
};

export type StatisticsAudioChallenge = {
  sumNewWordInDayAudioChallenge: number;
  procCorrectAnswerAudioChallenge: number;
  seriesCorrectAnswerAudioChallenge: number;
};

export type StatisticsSprint = {
  sumNewWordInDaySprint: number;
  procCorrectAnswerSprint: number;
  seriesCorrectAnswerSprint: number;
};

export type WordUser = {
  difficulty: string;
  id: string;
  wordId: string;
};

export type AggregatedWords = {
  paginatedResults: Word[];
  totalCount: [
    {
      count: number;
    }
  ];
};

export type DecodeToken = {
  exp: number;
  iat: number;
  id: string;
  tokenId: string;
};

export type Tokens = {
  refreshToken: string;
  token: string;
};

export type Answers = {
  rightAnswer: Word[];
  wrongAnswer: Word[];
};
