import { Dot, LucideProps, Star } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

import { Checkbox } from '@/components/ui/checkbox'

export interface TaskProps {
  id: number
  description: string
  done: boolean
  date: string | null
  tagName: string
  tagIcon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
}

interface TasksListItemProps {
  task: TaskProps
}

export function TasksListItem({ task }: TasksListItemProps) {
  return (
    <div className="flex items-center border border-slate-200 p-2 gap-4 min-h-[70px]">
      <Checkbox className="w-6 h-6" />
      <div className="flex flex-col grow">
        <span className="text-xl font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {task.description}
        </span>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Dot />
            <task.tagIcon size={13} />
            <span>{task.tagName}</span>
          </div>
          {task.date && (
            <div className="flex items-center gap-1">
              <Dot />
              <span>Hoje</span>
            </div>
          )}
        </div>
      </div>
      <Star />
    </div>
  )
}
