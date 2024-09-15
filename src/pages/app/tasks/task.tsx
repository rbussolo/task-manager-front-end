import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { format } from "date-fns"

import { registerTask } from '@/api/register-task'
import { GroupListSelect } from '@/components/group-list-select'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { Textarea } from '@/components/ui/textarea'
import { convertErrorToString } from '@/utils/error-to-toast'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { ptBR } from 'date-fns/locale'

const taskForm = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.enum(['Baixa', 'Média', 'Alta']),
  group_id: z.number().optional(),
  due_date: z.date().optional(),
})

type TaskForm = z.infer<typeof taskForm>

export function Task() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    watch,
  } = useForm<TaskForm>({
    defaultValues: {
      title: '',
      description: '',
      priority: 'Baixa'
    },
  })

  const { mutateAsync: registerTaskFn } = useMutation({
    mutationFn: registerTask,
  })

  async function handleNewTask(data: TaskForm) {
    try {
      if (!data.title) {
        throw new Error('É necessário informar o Titulo!')
      }
      console.log(data)
      await registerTaskFn(data)

      toast.success('Tarefa criada com sucesso!')
    } catch (error) {
      toast.error(convertErrorToString(error))
    }
  }

  const priority = watch('priority')
  const groupId = watch('group_id')
  const due_date = watch('due_date')

  return (
    <>
      <Helmet title="Nova Tarefa" />

      <div className="flex flex-col w-full h-full">
        <div className="p-10 flex flex-col justify-center bg-slate-200 min-h-[150px]">
          <h3 className="text-3xl">Nova tarefa</h3>
        </div>

        <div className="p-10 flex justify-center">
          <Card className="w-full lg:w-[816px]">
            <CardHeader className="pb-2">
              <CardTitle>Cadastro de Tarefas</CardTitle>
              <CardDescription>Cadastre suas tarefas o/</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handleNewTask)}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-4 flex-wrap">
                    <div className="w-full lg:w-[calc(100%-250px-1rem)]">
                      <Label htmlFor="title">Titulo</Label>
                      <Input id="title" type="text" {...register('title')} />
                    </div>

                    <div className="w-full lg:w-[250px]">
                      <Label htmlFor="priority">Prioridade</Label>

                      <Select
                        value={priority}
                        onValueChange={(value) => {
                          if (
                            value !== 'Baixa' &&
                            value !== 'Média' &&
                            value !== 'Alta'
                          )
                            return
                          setValue('priority', value)
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Prioridade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Selecione a prioridade</SelectLabel>
                            <SelectItem value="Baixa">Baixa</SelectItem>
                            <SelectItem value="Média">Média</SelectItem>
                            <SelectItem value="Alta">Alta</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="w-full">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        rows={5}
                        {...register('description')}
                      />
                    </div>

                    <div className="w-full lg:w-[calc(50%-0.5rem)]">
                      <Label htmlFor="name">Grupo</Label>

                      <GroupListSelect
                        groupId={groupId}
                        onChange={(groupId) => {
                          setValue('group_id', groupId)
                        }}
                      />
                    </div>

                    <div className="w-full lg:w-[calc(50%-0.5rem)]">
                      <Label htmlFor="name">Prazo</Label>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !due_date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {due_date ? format(due_date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={due_date}
                            onSelect={(value) => setValue('due_date', value)}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 justify-center">
                    <Button type="submit" disabled={isSubmitting}>
                      Cadastrar
                    </Button>
                    <Link to="/tasks">
                      <Button
                        variant="outline"
                        type="button"
                        disabled={isSubmitting}
                      >
                        Voltar
                      </Button>
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
