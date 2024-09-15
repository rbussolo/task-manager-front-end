import { createContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '../../lib/api'
import { IAuthProvider, IContext, IRequestError, IRequestLogin } from './types'
import { getUserLocalStorage } from './util'

const AuthContext = createContext<IContext>({} as IContext)

const AuthProvider = ({ children }: IAuthProvider) => {
  const navigate = useNavigate()

  async function authenticate(
    email: string,
    password: string,
  ): Promise<IRequestError | IRequestLogin> {
    if (!email || !password) {
      throw new Error('É necessário informar o E-mail e a Senha!')
    }

    return new Promise((resolve, reject) => {
      api
        .post('auth/login', {
          email,
          password,
        })
        .then((response) => {
          const result = response.data as IRequestLogin

          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  function logout() {
    navigate('/sign-in')
  }

  function getCurrentUser() {
    return getUserLocalStorage()
  }

  async function reauthenticate(): Promise<IRequestError | IRequestLogin> {
    return new Promise((resolve, reject) => {
      api
        .post('/auth/refresh')
        .then((response) => {
          const result = response.data as IRequestLogin
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const value = useMemo(
    () => ({ authenticate, logout, getCurrentUser, reauthenticate }),
    [],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
