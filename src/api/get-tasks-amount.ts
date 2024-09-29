import { api } from '@/lib/api'

export interface GetTasksAmount {
  amount: number
  amountImportant: number
  amountPlanned: number
  groups: {
    group_id: number
    amount: number
  }[]
}

export async function getTasksAmount() {
  const response = await api.get<GetTasksAmount>('/tasks/amount')

  return response.data
}
