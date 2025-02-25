import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerTask } from '@/api/register-task'
import { GroupListSelect } from '@/components/group-list-select'
import { PageContainer } from '@/components/page-container'
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
import { Textarea } from '@/components/ui/textarea'
import { convertErrorToString } from '@/utils/error-to-toast'

import { TaskCalendar } from './task-calendar'
import { TaskSelectPriority } from './task-select-priority'

const taskForm = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.enum(['', 'Baixa', 'Média', 'Alta']),
  group_id: z.number().optional(),
  due_date: z.date().optional(),
})

type TaskForm = z.infer<typeof taskForm>

export function Task() {
  const queryClient = useQueryClient()

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
      priority: 'Baixa',
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

      await registerTaskFn(data)

      // Refetch query
      queryClient.refetchQueries({ queryKey: ['tasks-amount'] })

      // Remove cache
      queryClient.removeQueries({ queryKey: ['tasks'] })

      toast.success('Tarefa criada com sucesso!')
    } catch (error) {
      toast.error(convertErrorToString(error))
    }
  }

  const priority = watch('priority')
  const groupId = watch('group_id')
  const dueDate = watch('due_date')

  function handleAddMinutes(minutes: number) {
    const newDueDate = dueDate ? new Date(dueDate) : new Date()
    newDueDate.setMinutes(newDueDate.getMinutes() + minutes)

    setValue('due_date', newDueDate)
  }

  return (
    <>
      <PageContainer
        title="Nova Tarefa"
        pageTitle="Nova Tarefa"
        description="Inclua uma nova tarefa o/"
      >
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

                    <TaskSelectPriority
                      priority={priority}
                      onPriorityChange={(value) => setValue('priority', value)}
                    />
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

                    <div className="flex gap-1">
                      <TaskCalendar
                        date={dueDate}
                        onDateChange={(value) => setValue('due_date', value)}
                      />

                      <Button
                        type="button"
                        onClick={() => handleAddMinutes(30)}
                        variant="outline"
                      >
                        +30m
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleAddMinutes(-15)}
                        variant="secondary"
                      >
                        -15m
                      </Button>
                    </div>
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
      </PageContainer>
    </>
  )
}
