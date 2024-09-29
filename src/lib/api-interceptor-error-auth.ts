import { InternalAxiosRequestConfig, isAxiosError } from 'axios'
import { NavigateFunction } from 'react-router-dom'

import { IContext } from '@/contexts/AuthProvider/types'

import { api } from './api'

interface IInternalAxiosRequestConfig<D = unknown>
  extends InternalAxiosRequestConfig<D> {
  _retry?: boolean
}

interface CreateInterceptorErrorAuthenticationProps {
  auth: IContext
  navigate: NavigateFunction
}

let requestingNewAccessToken = false
let requestingNewAccessTokenWasSuccess = false

async function waitFinishRequest() {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout'))
    }, 5000)

    function checkIsDone() {
      if (!requestingNewAccessToken) {
        return resolve()
      }

      setTimeout(checkIsDone, 100)
    }

    checkIsDone()
  })
}

async function requestNewAccessToken(auth: IContext) {
  if (requestingNewAccessToken) {
    await waitFinishRequest()
  } else {
    await requestToken(auth)
  }
}

async function requestToken(auth: IContext) {
  requestingNewAccessToken = true
  requestingNewAccessTokenWasSuccess = false

  try {
    await auth.reauthenticate()

    requestingNewAccessTokenWasSuccess = true
  } catch (error) {
    requestingNewAccessTokenWasSuccess = false
  }

  requestingNewAccessToken = false
}

export function createInterceptorErrorAuthentication({
  auth,
  navigate,
}: CreateInterceptorErrorAuthenticationProps) {
  const interceptorId = api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        isAxiosError(error) &&
        error.response?.status === 401 &&
        error.response?.config.url !== '/auth/refresh'
      ) {
        const originalRequest: IInternalAxiosRequestConfig | undefined =
          error.config

        if (originalRequest && !originalRequest._retry) {
          originalRequest._retry = true

          await requestNewAccessToken(auth)

          if (requestingNewAccessTokenWasSuccess) {
            return api(originalRequest)
          } else {
            navigate('/sign-in', { replace: true })
          }
        }
      }

      return Promise.reject(error)
    },
  )

  return interceptorId
}
