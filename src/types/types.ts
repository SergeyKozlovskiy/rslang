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
  IsLogin: boolean
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

