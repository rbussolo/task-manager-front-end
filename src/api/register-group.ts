import { api } from '@/lib/api'

export interface RegisterGroupBody {
  name: string
  icon: string
}

export async function registerGroup({
  name,
  icon
}: RegisterGroupBody) {
  await api.post('/group', {
    name,
    icon
  })
}
