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