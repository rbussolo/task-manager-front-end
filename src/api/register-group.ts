import { api } from '@/lib/api'

import { IGroup } from './get-groups'

export interface RegisterGroupBody {
  name: string
  icon: string
}

export interface RegisterGroupResponse extends IGroup {}

export async function registerGroup({
  name,
  icon,
}: RegisterGroupBody): Promise<RegisterGroupResponse> {
  const result = await api.post('/groups', {
    name,
    icon,
  })

  return result.data
}
