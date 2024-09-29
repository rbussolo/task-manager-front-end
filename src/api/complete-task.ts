import { api } from '@/lib/api'

export interface CompleteTaskRequest {
  id: number
}

export async function completeTask({ id }: CompleteTaskRequest) {
  await api.patch(`/tasks/${id}/completed`)
}
