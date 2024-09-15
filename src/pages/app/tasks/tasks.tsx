import { useQuery } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'

import { getTasks } from '@/api/get-tasks'
import { Button } from '@/components/ui/button'

import { TasksListItem } from './tasks-list-item'
import { TasksListSkeleton } from './tasks-list-skeleton'

export function Tasks() {
  const [searchParms] = useSearchParams()

  const isImportant = searchParms.get('important') !== null
  const tagName = isImportant ? '#Importante' : ''

  const { data, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })

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
            return <TasksListItem key={task.id} task={task} />
          })}
      </div>
    </div>
  )
}
