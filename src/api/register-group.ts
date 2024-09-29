import { api } from '@/lib/api'

import { IGroup } from './get-groups'

export interface RegisterGroupBody {
  name: string
  icon: string
  color: string
}

export interface RegisterGroupResponse extends IGroup {}

export async function registerGroup({
  name,
  icon,
  color,
}: RegisterGroupBody): Promise<RegisterGroupResponse> {
  const result = await api.post('/groups', {
    name,
    icon,
    color,
  })

  return result.data
}
