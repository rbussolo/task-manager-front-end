import { api } from '@/lib/api'

import { IGroup } from './get-groups'

export interface UpdateGroupBody {
  id: number
  name: string
  icon: string
  color: string
}

export interface UpdateGroupResponse extends IGroup {}

export async function updateGroup({
  id,
  name,
  icon,
  color,
}: UpdateGroupBody): Promise<UpdateGroupResponse> {
  const result = await api.patch<UpdateGroupResponse>(`/groups/${id}`, {
    name,
    icon,
    color,
  })

  return result.data
}
