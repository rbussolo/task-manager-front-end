import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/components/header'
import { useAuth } from '@/contexts/AuthProvider/useAuth'
import { api } from '@/lib/api'
import { createInterceptorErrorAuthentication } from '@/lib/api-interceptor-error-auth'

export function AppLayout() {
  const navigate = useNavigate()
  const auth = useAuth()

  useEffect(() => {
    const interceptorId = createInterceptorErrorAuthentication({
      auth,
      navigate,
    })

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
