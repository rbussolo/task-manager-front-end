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
    color: string
  }
}

export type GetTasksResponse = Task[]

export interface GetTasksRequest {
  isImportant?: boolean
  isCompleted?: boolean
  searchGroup?: string
}

export async function getTasks({
  isCompleted,
  isImportant,
  searchGroup,
}: GetTasksRequest) {
  const response = await api.get<GetTasksResponse>('/tasks', {
    params: {
      completed: isCompleted,
      important: isImportant,
      group_slug: searchGroup,
    },
  })

  return response.data
}
