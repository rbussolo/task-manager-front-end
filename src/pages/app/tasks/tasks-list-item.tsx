import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Dot, Star } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'

export interface TaskProps {
  id: number
  title: string
  description: string
  priority: string
  due_date: string | null
  create_at: string
  completed: boolean
  important: boolean
  group?: {
    id: number
    name: string
    icon: string
  }
}

interface TasksListItemProps {
  task: TaskProps
}

export function TasksListItem({ task }: TasksListItemProps) {
  console.log(task)

  return (
    <div className="flex items-center border border-slate-200 p-2 gap-4 min-h-[70px]">
      <Checkbox className="w-6 h-6" />
      <div className="flex flex-col grow">
        <span className="text-xl font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {task.title}
        </span>
        <div className="flex items-center gap-2 text-sm">
          {task.group?.icon && (
            <div className="flex items-center gap-1">
              <Dot />
              <img src={task.group.icon} alt={task.group.name} />
              <span>{task.group.name}</span>
            </div>
          )}
          {task.due_date && (
            <div className="flex items-center gap-1">
              <Dot />
              <span>
                {formatDistanceToNow(task.due_date, {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </span>
            </div>
          )}
        </div>
      </div>
      <Star />
    </div>
  )
}
