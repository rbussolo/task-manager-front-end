export interface IUser {
  user?: {
    id: number
    login: string
  }
  access_token?: string
  refresh_token?: string
}

export interface IAuthProvider {
  children: JSX.Element
}

export interface IRequestError {
  status?: number
  code?: string
  message: string
  messages?: string[]
}

export interface IRequestSuccess {
  success: boolean
}

export interface IRequestLogin {
  success: boolean
}

export interface AccessTokenDecoded {
  exp: number
  iat: number
  sub: number
  login: string
}

export interface IContext {
  getCurrentUser: () => IUser | null
  authenticate: (
    email: string,
    password: string,
  ) => Promise<IRequestError | IRequestLogin>
  logout: () => void
}
