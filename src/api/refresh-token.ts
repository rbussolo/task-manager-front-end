import { api } from '@/lib/api'

export async function refreshToken() {
  await api.post('/auth/refresh')
}
