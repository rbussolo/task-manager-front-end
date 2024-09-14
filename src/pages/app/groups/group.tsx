import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { IGroup } from '@/api/get-groups'
import { registerGroup } from '@/api/register-group'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { convertErrorToString } from '@/utils/error-to-toast'

import { GroupSelectIcon } from './group-select-icon'

const groupForm = z.object({
  name: z.string(),
  icon: z.string(),
})

type GroupForm = z.infer<typeof groupForm>

export function Group() {
  const queryClient = useQueryClient()

  const {
    watch,
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<GroupForm>()

  const { mutateAsync: registerGroupFn } = useMutation({
    mutationFn: registerGroup,
  })

  function updateGroupsCache(group: IGroup) {
    const cached = queryClient.getQueryData<IGroup[]>(['groups'])

    if (!cached) return

    const newCached = [...cached, group]

    queryClient.setQueryData<IGroup[]>(['groups'], newCached)
  }

  async function handleNewGroup(data: GroupForm) {
    try {
      const group = await registerGroupFn({
        name: data.name,
        icon: data.icon,
      })

      updateGroupsCache(group)

      toast.success('Grupo criado com sucesso!')
    } catch (error) {
      toast.error(convertErrorToString(error))
    }
  }

  const icon = watch('icon')

  return (
    <>
      <Helmet title="Grupo" />

      <div className="flex flex-col w-full h-full">
        <div className="p-10 flex flex-col justify-center bg-slate-200 min-h-[150px]">
          <h3 className="text-3xl">Novo grupo</h3>
        </div>

        <div className="p-10">
          <form onSubmit={handleSubmit(handleNewGroup)}>
            <div className="flex flex-col border border-slate-200 p-6 gap-4">
              <div className="flex flex-row gap-4">
                <div className="w-[250px]">
                  <Label htmlFor="iconUrl">Icone do grupo:</Label>

                  <GroupSelectIcon
                    icon={icon}
                    onChange={(value) => {
                      setValue('icon', value)
                    }}
                  />
                </div>

                <div className="flex-grow">
                  <Label htmlFor="name">Nome do grupo</Label>
                  <Input
                    id="name"
                    type="text"
                    className="w-full"
                    {...register('name')}
                  />
                </div>
              </div>

              <div className="flex flex-row gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  Cadastrar
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
