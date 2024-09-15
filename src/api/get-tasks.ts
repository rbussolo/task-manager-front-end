import { api } from '@/lib/api'

export interface ITag {
  id: number
  name: string
  description: string
  urlImage: string
}

export interface ITask {
  id: number
  title: string
  description: string
  priority: string
  due_date: string | null
  completed: boolean
  important: boolean
  create_at: string
  group?: {
    id: number
    name: string
    icon: string
  }
}

export interface GetTasks {
  tasks: ITask[]
}

export async function getTasks() {
  const response = await api.get<GetTasks>('/tasks')

  return response.data
}
