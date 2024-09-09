import { useMutation, useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { getGroupById } from '@/api/get-group-by-id'
import { registerGroup } from '@/api/register-group'
import Apple from '@/assets/apple.svg'
import BadgeDollar from '@/assets/badge-dollar-sign.svg'
import Briefcase from '@/assets/briefcase.svg'
import Calendar from '@/assets/calendar.svg'
import Taxi from '@/assets/car-taxi-front.svg'
import Home from '@/assets/home.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { convertErrorToString } from '@/utils/error-to-toast'

type IconSelect = {
  url: string
  description: string
}

let icons: IconSelect[] = [
  {
    url: Apple,
    description: 'Comida',
  },
  {
    url: BadgeDollar,
    description: 'Dinheiro',
  },
  {
    url: Calendar,
    description: 'Calendario',
  },
  {
    url: Home,
    description: 'Casa',
  },
  {
    url: Briefcase,
    description: 'Trabalho',
  },
  {
    url: Taxi,
    description: 'Transporte',
  },
]

icons = icons.sort((a, b) => {
  if (a.description > b.description) {
    return 1
  } else if (a.description < b.description) {
    return -1
  }

  return 0
})

const groupForm = z.object({
  name: z.string(),
  icon: z.string(),
})

type GroupForm = z.infer<typeof groupForm>

export function Group() {
  const { id } = useParams()
  const groupId = id && parseInt(id) > 0 ? parseInt(id) : 0

  const {
    watch,
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<GroupForm>({
    defaultValues: {
      name: '',
      icon: '',
    },
  })

  const { isLoading } = useQuery({
    queryKey: ['group', id],
    queryFn: async () => {
      const data = await getGroupById(groupId)

      setValue('name', data.name)
      setValue('icon', data.icon)

      return data
    },
    enabled: groupId > 0,
  })

  const { mutateAsync: registerGroupFn } = useMutation({
    mutationFn: registerGroup,
  })

  async function handleNewGroup(data: GroupForm) {
    try {
      await registerGroupFn({
        id: groupId,
        name: data.name,
        icon: data.icon,
      })

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
                <div>
                  <Label htmlFor="iconUrl">Icone do grupo:</Label>

                  <Select
                    value={icon}
                    onValueChange={(value) => {
                      setValue('icon', value)
                    }}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Selecione um icone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Icones diponíveis:</SelectLabel>

                        {icons.map((icon) => {
                          return (
                            <SelectItem key={icon.description} value={icon.url}>
                              <div className="flex flex-row align-middle gap-2">
                                <img src={icon.url} /> {icon.description}
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-grow">
                  <Label htmlFor="name">Nome do grupo</Label>
                  <Input
                    id="name"
                    type="text"
                    className="w-full"
                    {...register('name')}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex flex-row gap-4">
                <Button type="submit" disabled={isSubmitting || isLoading}>
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
