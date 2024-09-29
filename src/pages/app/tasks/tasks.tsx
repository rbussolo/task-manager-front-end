import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { completeTask } from '@/api/complete-task'
import { deleteTask } from '@/api/delete-task'
import { getTasks, Task } from '@/api/get-tasks'
import { Button } from '@/components/ui/button'
import { convertErrorToString } from '@/utils/error-to-toast'

import { TasksListItem } from './tasks-list-item'
import { TasksListSkeleton } from './tasks-list-skeleton'

export function Tasks() {
  const [searchParms] = useSearchParams()
  const queryClient = useQueryClient()

  const isCompleted = searchParms.get('completed') !== null || false
  const isImportant = searchParms.get('important') !== null || undefined
  const searchGroup = searchParms.get('group') || undefined
  const tagName = isImportant ? '#Importante' : ''

  const { data, isLoading } = useQuery({
    queryKey: ['tasks', isImportant, searchGroup],
    queryFn: () => getTasks({ isCompleted, isImportant, searchGroup }),
  })

  const { mutateAsync: completeTaskFn } = useMutation({
    mutationFn: completeTask,
  })

  const { mutateAsync: deleteTaskFn } = useMutation({
    mutationFn: deleteTask,
  })

  async function handleTaskFinished(id: number) {
    try {
      await completeTaskFn({ id })

      updateCacheOfTasks(id)

      toast.success('Tarefa concluída com sucesso!')
    } catch (error) {
      toast.error(convertErrorToString(error))
    }
  }

  async function handleTaskDeleted(id: number) {
    try {
      await deleteTaskFn({ id })

      updateCacheOfTasks(id)

      toast.success('Tarefa removida com sucesso!')
    } catch (error) {
      toast.error(convertErrorToString(error))
    }
  }

  function updateCacheOfTasks(id: number) {
    const cached = queryClient.getQueryData<Task[]>([
      'tasks',
      isImportant,
      searchGroup,
    ])

    if (!cached) return

    const newCached = cached.map((task) => {
      if (task.id !== id) return task

      return { ...task, completed: true }
    })

    queryClient.setQueryData<Task[]>(
      ['tasks', isImportant, searchGroup],
      newCached,
    )
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="p-10 flex flex-col justify-center bg-slate-200 min-h-[150px]">
        <h3 className="text-3xl">Tarefas</h3>
        {tagName && <h4 className="text-sm">{tagName}</h4>}
      </div>

      <div className="p-10 flex flex-col gap-2">
        <div className="flex justify-end">
          <Link to="/task">
            <Button>Nova Tarefa</Button>
          </Link>
        </div>

        {isLoading && <TasksListSkeleton />}

        {data &&
          data.map((task) => {
            if (task.completed) return null

            return (
              <TasksListItem
                key={task.id}
                task={task}
                onTaskFinished={handleTaskFinished}
                onTaskRemoved={handleTaskDeleted}
              />
            )
          })}
      </div>
    </div>
  )
}
