import { api } from '@/lib/api'

export interface GetTasksAmount {
  amount: number
  amountImportant: number
  amountPlanned: number
  tags: {
    id: number
    name: string
    urlIcon: string
    amount: number
  }[]
}

export async function getTasksAmount() {
  const response = await api.get<GetTasksAmount>('/tasks/amount')

  return response.data
}
