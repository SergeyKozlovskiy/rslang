export interface IAction {
  type: string,
  value: IRespSignIn
}

export interface ICreateUser {  
  name: string,
  email: string,
  password: string
}

export interface IRespPostUser {
  id: string,
  email: string,
  name: string
}

export interface IPostSignIn {
  email: string,
  password: string
}

export interface IRespSignIn {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string
}

export interface IPopupProps {
  className: string,
  text: string
}

export interface IReduxState {
  userInfo: IRespSignIn,
  IsLogin: boolean,
  isWordsLoad: boolean
}

export interface ILevelBtnProps {
  level: string,
  title: string,
  color: string,
  page: number,
  group: number
}

export interface IStatistic {
  learnedWords: number,
  optional: {
    sprint?: IStatisticBody,
    audioChalange?: IStatisticBody,
  }
}

export interface IStatisticBody {
  gameLernedWords: number
  persent: number,
  wins: number
}

export type WordsType = {
  id: string,
  group:	number,
  page:	number,
  word:	string,
  image:	string,
  audio:	string,
  audioMeaning:	string,
  audioExample:	string,
  textMeaning:	string,
  textExample:	string,
  transcription:	string,
  wordTranslate:	string,
  textMeaningTranslate:	string,
  textExampleTranslate:	string,

}

export type WordsActionType = {
  type: string,
  value: Array<WordsType>
}