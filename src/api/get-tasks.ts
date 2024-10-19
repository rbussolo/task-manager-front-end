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
  title?: string
  priority?: string
  sort?: string
}

export async function getTasks({
  isCompleted,
  isImportant,
  searchGroup,
  title,
  priority,
  sort,
}: GetTasksRequest) {
  const response = await api.get<GetTasksResponse>('/tasks', {
    params: {
      completed: isCompleted,
      important: isImportant,
      group_slug: searchGroup,
      title,
      priority,
      order: sort,
    },
  })

  return response.data
}
