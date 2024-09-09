import { api } from '@/lib/api'

import { IGroup } from './get-groups'

export async function getGroupById(id: number) {
  const response = await api.get<IGroup>(`/groups/${id}`)

  return response.data
}
