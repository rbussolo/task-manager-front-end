import { api } from '@/lib/api'

export interface RegisterGroupBody {
  id?: number
  name: string
  icon: string
}

export async function registerGroup({ id, name, icon }: RegisterGroupBody) {
  if (id) {
    await api.patch(`/groups/${id}`, {
      name,
      icon,
    })
  } else {
    await api.post('/groups', {
      name,
      icon,
    })
  }
}
