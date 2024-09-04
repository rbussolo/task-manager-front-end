import { api } from '@/lib/api'

export interface GetProfile {
  id: number
  name: string
  email: string
  urlImage: string
}

export async function getProfile() {
  const response = await api.get<GetProfile>('/users')

  return response.data
}
