import { api } from '@/lib/api'

export interface Task {
  id: number
  title: string
  description: string
  priority: string
  due_date: string | null
  completed: boolean
  important: boolean
  created_at: string
  group?: {
    id: number
    name: string
    icon: string
  }
}

export type GetTasksResponse = Task[]

export async function getTasks() {
  const response = await api.get<GetTasksResponse>('/tasks')

  return response.data
}
