import { DialogTitle } from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { getGroupById } from '@/api/get-group-by-id'
import { IGroup } from '@/api/get-groups'
import { updateGroup } from '@/api/update-group'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { convertErrorToString } from '@/utils/error-to-toast'

import { GroupSelectIcon } from './group-select-icon'

interface GroupEditProps {
  groupId: number
  open: boolean
  closeDialog: () => void
}

const groupForm = z.object({
  name: z.string(),
  icon: z.string(),
  color: z.string(),
})

type GroupForm = z.infer<typeof groupForm>

export function GroupEdit({ groupId, open, closeDialog }: GroupEditProps) {
  const queryClient = useQueryClient()

  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
    setValue,
  } = useForm<GroupForm>({
    defaultValues: {
      name: '',
      icon: '',
      color: '',
    },
  })

  const { isLoading } = useQuery({
    queryKey: ['group', groupId],
    queryFn: async () => {
      const group = await getGroupById(groupId)

      reset({
        name: group.name,
        icon: group.icon,
        color: group.color,
      })

      return group
    },
    enabled: open,
  })

  const { mutateAsync: registerGroupFn } = useMutation({
    mutationFn: updateGroup,
  })

  function updateGroupsCache(group: IGroup) {
    const cached = queryClient.getQueryData<IGroup[]>(['groups'])

    if (!cached) return

    const newCached = cached.map((g) => {
      if (g.id !== group.id) return g

      return group
    })

    queryClient.setQueryData<IGroup[]>(['groups'], newCached)
  }

  async function handleNewGroup(data: GroupForm) {
    try {
      const group = await registerGroupFn({
        id: groupId,
        name: data.name,
        icon: data.icon,
        color: data.color,
      })

      updateGroupsCache(group)
      closeDialog()

      toast.success('Grupo criado com sucesso!')
    } catch (error) {
      toast.error(convertErrorToString(error))
    }
  }

  const icon = watch('icon')

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Grupo</DialogTitle>
        <DialogDescription>Detalhes do Grupo</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleNewGroup)}>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="iconUrl">Icone do grupo:</Label>

            <GroupSelectIcon
              icon={icon}
              onChange={(value) => {
                setValue('icon', value)
              }}
            />
          </div>

          <div>
            <Label htmlFor="color">Cor:</Label>

            <Input
              id="color"
              type="color"
              className="w-full p-0 border-none"
              {...register('color')}
            />
          </div>

          <div>
            <Label htmlFor="name">Nome do grupo:</Label>
            <Input
              id="name"
              type="text"
              className="w-full"
              {...register('name')}
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-row gap-4">
            <Button type="submit" disabled={isSubmitting || isLoading}>
              Cadastrar
            </Button>
          </div>
        </div>
      </form>
    </DialogContent>
  )
}
