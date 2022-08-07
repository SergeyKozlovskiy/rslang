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

// export type Statistics = {
//   token: string;
//   userId: string;
//   sumNewWordInDaySprint: number;
//   procCorrectAnswerSprint: number;
//   seriesCorrectAnswerSprint: number;
//   sumNewWordInDayAudioChallenge: number;
//   procCorrectAnswerAudioChallenge: number;
//   seriesCorrectAnswerAudioChallenge: number;
// };

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

export type Props = {
  refreshToken: string;
};
export interface IAction {
  type: string;
  value: IRespSignIn;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export interface IRespPostUser {
  id: string;
  email: string;
  name: string;
}

export interface IPostSignIn {
  email: string;
  password: string;
}

export interface IRespSignIn {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface IPopupProps {
  className: string;
  text: string;
}

export interface IReduxState {
  userInfo: IRespSignIn;
  IsLogin: boolean;
  isWordsLoad: boolean;
}

export interface ILevelBtnProps {
  level: string;
  title: string;
  color: string;
  page: number;
  group: number;
}

export interface IStatistic {
  learnedWords: number;
  optional: {
    sprint?: IStatisticBody;
    audioChalange?: IStatisticBody;
  };
}

export interface IStatisticBody {
  lastActivity: string;
  corectAnswers: number;
  persent: number;
  wins: number;
}

export type WordsType = {
  id: string;
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
  isAggregated?: boolean;
  deleteFunc?: () => void;
  getWordsFunc?: () => void;
};

export type WordsActionType = {
  type: string;
  value: Array<WordsType>;
};

// export type WordData = {
//   id: string;
//   group: number;
//   page: number;
//   word: string;
//   image: string;
//   audio: string;
//   audioMeaning: string;
//   audioExample: string;
//   textMeaning: string;
//   textExample: string;
//   transcription: string;
//   wordTranslate: string;
//   textMeaningTranslate: string;
//   textExampleTranslate: string;
// };

export type WordGame = {
  word: string;
  audio: string;
  translate: string;
  img?: string;
};

export type Question = {
  word: string;
  translate: string;
  answer: boolean;
  audio: string;
};

export type Answers = {
  rightAnswer: Word[];
  wrongAnswer: Word[];
};

export type SelectProps = {
  level: number;
};

export type AudioBtnPropsType = {
  audioUrl: string;
  audioExempleUrl: string;
  audioMeaningUrl: string;
};

export type WordsHardOrLernType = {
  difficulty: string;
  optional: WordsType;
};

export type DictionaryStateType = {
  paginatedResults: Array<DictionaryWordsType>;
  totalCount: Array<DictionaryTotalCountType>;
};

type DictionaryTotalCountType = {
  count: number;
};

export type DictionaryWordsType = {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  userWord: WordsHardOrLernType;
  word: string;
  wordTranslate: string;
  _id: string;
};

export type StatisticsLocalStateType = {
  isStatisticLoaded: boolean;
  statistic: IStatistic | null;
};

export type WordsDifficultCardBtn = {
  aggregatedWordsLoaded: boolean;
  hardWords: Array<string> | null;
  lernWords: Array<string> | null;
  activeWord: string | null;
};
