import { api } from '@/lib/api'

export interface DeleteTaskRequest {
  id: number
}

export async function deleteTask({ id }: DeleteTaskRequest) {
  await api.delete(`/tasks/${id}`)
}
