import { api } from '@/lib/api'

import { IGroup } from './get-groups'

export interface UpdateGroupBody {
  id: number
  name: string
  icon: string
}

export interface UpdateGroupResponse extends IGroup {}

export async function updateGroup({
  id,
  name,
  icon,
}: UpdateGroupBody): Promise<UpdateGroupResponse> {
  const result = await api.patch<UpdateGroupResponse>(`/groups/${id}`, {
    name,
    icon,
  })

  return result.data
}
