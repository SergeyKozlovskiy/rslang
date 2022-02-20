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
  isAggregated?: boolean,
  deleteFunc?: Function,
  getWordsFunc?: Function
}

export type WordsActionType = {
  type: string,
  value: Array<WordsType>
}

export type WordData = {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
}

export type Word = {
word: string,
audio: string,
translate: string,
img?: string
}

export type Question = {
word: string,
translate: string, 
answer: boolean,
audio: string
}

export type Answers = {
rightAnswer: Word[],
wrongAnswer: Word[]
}

export type SelectProps = {
  level: number
}

export type AudioBtnPropsType = {
  audioUrl: string, 
  audioExempleUrl: string, 
  audioMeaningUrl: string
}

export type WordsHardOrLernType = {
  difficulty: string,
  optional: WordsType
}

export type DictionaryStateType = {
  paginatedResults: Array<DictionaryWordsType>,
  totalCount: Array<DictionaryTotalCountType>
}

type DictionaryTotalCountType = {
  count: number
}

type DictionaryWordsType = {
  audio: string,
  audioExample: string,
  audioMeaning: string,
  group: number,
  image: string,
  page: number,
  textExample: string,
  textExampleTranslate: string,
  textMeaning: string,
  textMeaningTranslate: string,
  transcription: string,
  userWord: WordsHardOrLernType,
  word: string,
  wordTranslate: string,
  _id: string,
}