import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { completeTask } from '@/api/complete-task'
import { deleteTask } from '@/api/delete-task'
import { getTasks } from '@/api/get-tasks'
import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'
import { generateKeyCacheToTasks } from '@/lib/react-query'
import { convertErrorToString } from '@/utils/error-to-toast'

import { TasksFilters } from './tasks-filters'
import { TasksListItem } from './tasks-list-item'
import { TasksListSkeleton } from './tasks-list-skeleton'

export function Tasks() {
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()

  const isCompleted = searchParams.get('completed') !== null || false
  const isImportant = searchParams.get('important') !== null || undefined
  const searchGroup = searchParams.get('group') || undefined
  const tagName = isImportant ? '#Importante' : ''
  const title = searchParams.get('title') || undefined
  const priority = searchParams.get('priority') || undefined
  const sort = searchParams.get('sort') || undefined

  const { data, isLoading } = useQuery({
    queryKey: generateKeyCacheToTasks({
      important: isImportant,
      completed: isCompleted,
      group_slug: searchGroup,
      title,
      priority,
      sort,
    }),
    queryFn: () =>
      getTasks({
        isCompleted,
        isImportant,
        searchGroup,
        title,
        priority,
        sort,
      }),
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

      // Refetch query
      queryClient.refetchQueries({ queryKey: ['tasks'] })
      queryClient.refetchQueries({ queryKey: ['tasks-amount'] })

      toast.success('Tarefa concluída com sucesso!')
    } catch (error) {
      toast.error(convertErrorToString(error))
    }
  }

  async function handleTaskDeleted(id: number) {
    try {
      await deleteTaskFn({ id })

      // Refetch query
      queryClient.refetchQueries({ queryKey: ['tasks'] })
      queryClient.refetchQueries({ queryKey: ['tasks-amount'] })

      toast.success('Tarefa removida com sucesso!')
    } catch (error) {
      toast.error(convertErrorToString(error))
    }
  }

  return (
    <PageContainer title="Tarefas" pageTitle="Tarefas" description={tagName}>
      <div className="flex justify-end">
        <Link to="/task">
          <Button>Nova Tarefa</Button>
        </Link>
      </div>

      <div>
        <TasksFilters />
      </div>

      {isLoading && <TasksListSkeleton />}

      {data &&
        data.map((task) => {
          return (
            <TasksListItem
              key={task.id}
              task={task}
              onTaskFinished={handleTaskFinished}
              onTaskRemoved={handleTaskDeleted}
            />
          )
        })}
    </PageContainer>
  )
}
