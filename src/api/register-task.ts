import { api } from '@/lib/api'

export interface RegisterTaskBody {
  title: string
  description?: string
  priority: string
  due_date?: string | Date | undefined
  group_id?: number | undefined
}

export async function registerTask(task: RegisterTaskBody) {
  await api.post('/tasks', task)
}
