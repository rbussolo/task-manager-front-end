import { api } from '@/lib/api'

import { Task } from './get-tasks'

export interface RegisterTaskBody {
  title: string
  description?: string
  priority: string
  due_date?: string | Date | undefined
  group_id?: number | undefined
}

export type RegisterTaskResponse = Task

export async function registerTask(task: RegisterTaskBody) {
  const response = await api.post<RegisterTaskResponse>('/tasks', task)

  return response.data
}
