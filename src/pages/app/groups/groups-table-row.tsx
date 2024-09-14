import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Pencil, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { deleteGroup } from '@/api/delete-group'
import { IGroup } from '@/api/get-groups'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { convertErrorToString } from '@/utils/error-to-toast'

import { GroupEdit } from './group-edit'

interface GroupsTableRowProps {
  group: IGroup
}

export function GroupsTableRow({ group }: GroupsTableRowProps) {
  const [isOpenEditGroup, setOpenEditGroup] = useState(false)
  const queryClient = useQueryClient()

  const { mutateAsync: deleteGroupFn } = useMutation({
    mutationFn: deleteGroup,
  })

  async function handleDelete(id: number) {
    try {
      await deleteGroupFn({ id })

      deleteGroupFromCache(id)

      toast.success('Registro removido com sucesso!')
    } catch (error) {
      toast.error(convertErrorToString(error))
    }
  }

  function deleteGroupFromCache(id: number) {
    const cached = queryClient.getQueryData<IGroup[]>(['groups'])

    if (!cached) return

    const newCached = cached.filter((group) => !(group.id === id))
    queryClient.setQueryData<IGroup[]>(['groups'], newCached)
  }

  return (
    <TableRow key={group.id}>
      <TableCell className="font-medium">{group.name}</TableCell>
      <TableCell className="flex gap-2">
        <Dialog open={isOpenEditGroup} onOpenChange={setOpenEditGroup}>
          <DialogTrigger asChild>
            <Button variant="default">
              <Pencil className="h-3 w-3" />
            </Button>
          </DialogTrigger>

          <GroupEdit
            open={isOpenEditGroup}
            groupId={group.id}
            closeDialog={() => setOpenEditGroup(false)}
          />
        </Dialog>
        <Button variant="destructive" onClick={() => handleDelete(group.id)}>
          <X className="h-3 w-3" />
        </Button>
      </TableCell>
    </TableRow>
  )
}