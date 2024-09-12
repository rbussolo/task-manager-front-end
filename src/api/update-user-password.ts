import { api } from '@/lib/api'

export interface UpdateUserPasswordBody {
  password: string
}

export async function updateUserPassword({ password }: UpdateUserPasswordBody) {
  await api.patch('/users/password', {
    password,
  })
}
