import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export interface TaskProps {
  id: number
  title: string
  description: string
  priority: string
  due_date: string | null
  created_at: string
  completed: boolean
  important: boolean
  group?: {
    id: number
    name: string
    icon: string
    color: string
  }
}

interface TasksListItemProps {
  task: TaskProps
  onTaskFinished: (taskId: number) => void
  onTaskRemoved: (taskId: number) => void
}

export function TasksListItem({
  task,
  onTaskFinished,
  onTaskRemoved,
}: TasksListItemProps) {
  const [showDetail, setShowDetail] = useState(false)

  return (
    <div className="flex items-center border border-slate-200 p-2 gap-4 min-h-[70px]">
      <Checkbox className="w-6 h-6" onClick={() => onTaskFinished(task.id)} />
      <div className="flex flex-col grow">
        <span className="text-xl font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {task.title}
        </span>
        {showDetail && (
          <div className="flex flex-col gap-1 mb-1">
            {task.description && (
              <div className="flex items-center text-sm p-1 border border-state-200">
                <span>{task.description}</span>
              </div>
            )}
            <div className="flex items-center text-sm gap-1">
              <Badge variant="secondary">
                {'Data de Criação: ' +
                  format(task.created_at, 'dd/MM/yyyy - HH:mm:ss')}
              </Badge>
              {task.due_date && (
                <Badge variant="outline">
                  {'Data limite: ' +
                    format(task.due_date, 'dd/MM/yyyy - HH:mm:ss')}
                </Badge>
              )}
            </div>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <div className="flex gap-1">
            <Badge variant="secondary">
              {formatDistanceToNow(task.created_at, {
                addSuffix: true,
                locale: ptBR,
              })}
            </Badge>
            {task.due_date && (
              <Badge
                variant="outline"
                className={
                  new Date(task.due_date) < new Date()
                    ? 'bg-red-200 hover:bg-red-400'
                    : ''
                }
              >
                {formatDistanceToNow(task.due_date, {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </Badge>
            )}
          </div>

          {task.priority === 'Alta' && (
            <Badge className="bg-red-700 hover:bg-red-900">
              {task.priority}
            </Badge>
          )}

          {task.priority === 'Média' && (
            <Badge className="bg-blue-700 hover:bg-blue-900">
              {task.priority}
            </Badge>
          )}

          {task.priority === 'Baixa' && (
            <Badge className="bg-green-700 hover:bg-green-900">
              {task.priority}
            </Badge>
          )}

          {task.group?.icon && (
            <Badge bgColor={task.group.color}>{task.group.name}</Badge>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <Button
          type="button"
          className="p-1 h-8 rounded-full"
          variant="outline"
          onClick={() => setShowDetail(!showDetail)}
        >
          {showDetail ? <ArrowUp /> : <ArrowDown />}
        </Button>
        <Button
          type="button"
          className="p-1 h-8 rounded-full"
          variant="outline"
          onClick={() => onTaskRemoved(task.id)}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  )
}
