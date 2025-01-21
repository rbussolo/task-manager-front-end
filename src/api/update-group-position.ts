import { api } from '@/lib/api'

export interface UpdateGroupPositionBody {
  g1Id: number
  g1Position: number
  g2Id: number
  g2Position: number
}

export async function updateGroupPosition({
  g1Id,
  g1Position,
  g2Id,
  g2Position,
}: UpdateGroupPositionBody) {
  await api.patch('/groups/position', {
    g1Id,
    g1Position,
    g2Id,
    g2Position,
  })
}
