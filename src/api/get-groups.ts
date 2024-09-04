import { api } from '@/lib/api'

export interface IGroup {
  id: number
  name: string
  icon: string
}

export async function getGroups() {
  const response = await api.get<IGroup[]>('/groups')

  return response.data
}
