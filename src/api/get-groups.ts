import { api } from '@/lib/api'

export interface IGroup {
  id: number
  name: string
  icon: string
  color: string
  slug: string
  amount: number
}

export async function getGroups() {
  const response = await api.get<IGroup[]>('/groups')

  return response.data
}
