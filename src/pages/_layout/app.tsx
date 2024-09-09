import { InternalAxiosRequestConfig, isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/components/header'
import { useAuth } from '@/contexts/AuthProvider/useAuth'
import { api } from '@/lib/api'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IInternalAxiosRequestConfig<D = any>
  extends InternalAxiosRequestConfig<D> {
  _retry?: boolean
}

export function AppLayout() {
  const navigate = useNavigate()
  const auth = useAuth()

  useEffect(() => {
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

            try {
              await auth.reauthenticate()

              return api(originalRequest)
            } catch (error) {
              navigate('/sign-in', { replace: true })
            }
          } else {
            navigate('/sign-in', { replace: true })
          }
        }

        return Promise.reject(error)
      },
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [auth, navigate])

  return (
    <div className="flex h-full flex-col antialiased">
      <div className="flex h-full">
        <Header />
        <div className="h-full flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
