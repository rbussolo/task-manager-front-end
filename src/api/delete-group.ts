import { api } from '@/lib/api'

export interface DeleteGroupRequest {
  id: number
}

export async function deleteGroup({ id }: DeleteGroupRequest) {
  await api.delete(`/groups/${id}`)
}
