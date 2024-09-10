import { api } from '@/lib/api'

export interface UpdateUserBody {
  name: string
  email: string
}

export async function updateUser({ name, email }: UpdateUserBody) {
  await api.patch('/users', {
    name,
    email,
  })
}
