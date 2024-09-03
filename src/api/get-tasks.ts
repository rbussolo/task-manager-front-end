import { api } from '@/lib/api'

export interface ITag {
  id: number
  name: string
  description: string
  urlImage: string
}

export interface ITask {
  id: number
  description: string
  date: string | null
  isDone: boolean
  isImportant: boolean
  tag?: ITag
}

export interface GetTasks {
  tasks: ITask[]
}

export async function getTasks() {
  const response = await api.get<GetTasks>('/tasks')

  return response.data
}
