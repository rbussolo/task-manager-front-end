import axios from 'axios'

import { env } from '@/env'

// import { getUserLocalStorage } from '../contexts/AuthProvider/util'

export const api = axios.create({
  baseURL: env.VITE_APP_URL,
  withCredentials: true,
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )

    return config
  })
}

/*
api.interceptors.request.use(
  async (config) => {
    const user = getUserLocalStorage()

    if (user?.access_token) {
      config.headers!.Authorization = `Bearer ${user?.access_token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
*/
