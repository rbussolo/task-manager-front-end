import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import { getGroups, IGroup } from '@/api/get-groups'
import { updateGroupPosition } from '@/api/update-group-position'
import { Loading } from '@/components/loading'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { convertErrorToString } from '@/utils/error-to-toast'

import { GroupsTableRow } from './groups-table-row'

export function GroupsTable() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups,
  })

  const [isUpdating, setIsUpdating] = useState(false)

  async function handleOnChangeUp(group: IGroup) {
    if (!data) return

    let index = 0

    while (index < data.length) {
      if (group.id === data[index].id) {
        break
      }

      index += 1
    }

    if (index === 0) return

    await changePosition(data[index], data[index - 1])
  }

  async function handleOnChangeDown(group: IGroup) {
    if (!data) return

    let index = 0

    while (index < data.length) {
      if (group.id === data[index].id) {
        break
      }

      index += 1
    }

    if (index >= data.length) return

    await changePosition(data[index], data[index + 1])
  }

  async function changePosition(g1: IGroup, g2: IGroup) {
    setIsUpdating(true)

    try {
      await updateGroupPosition({
        g1Id: g1.id,
        g1Position: g2.position,
        g2Id: g2.id,
        g2Position: g1.position,
      })

      const cached = queryClient.getQueryData<IGroup[]>(['groups'])

      if (!cached) return

      queryClient.setQueryData<IGroup[]>(
        ['groups'],
        cached
          .map((group) => {
            if (group.id === g1.id) {
              return { ...g1, position: g2.position }
            }

            if (group.id === g2.id) {
              return { ...g2, position: g1.position }
            }

            return group
          })
          .sort((a, b) => a.position - b.position),
      )
    } catch (error) {
      toast.error(convertErrorToString(error))
    }

    setIsUpdating(false)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead className="w-[130px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            !isLoading &&
            data.map((group, index) => {
              const showUp = index > 0
              const showDown = index + 1 < data.length

              return (
                <GroupsTableRow
                  key={group.id}
                  group={group}
                  showUp={showUp}
                  showDown={showDown}
                  changeToUp={handleOnChangeUp}
                  changeToDown={handleOnChangeDown}
                />
              )
            })}
        </TableBody>
      </Table>

      <Loading isLoading={isUpdating} />
    </>
  )
}
