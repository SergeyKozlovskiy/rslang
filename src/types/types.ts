export interface IAction {
  type: string,
  value: ICreateUser
}

export interface ICreateUser {  
  name: string,
  email: string,
  password: string
}