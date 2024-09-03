import { Home, PersonStanding } from 'lucide-react'

import { TaskProps, TasksListItem } from './tasks-list-item'

const tasks: TaskProps[] = [
  {
    id: 1,
    description: 'Arrumar o escritório',
    date: new Date().toISOString(),
    done: false,
    tagIcon: Home,
    tagName: 'Casa',
  },
  {
    id: 2,
    description: 'Limpar o banheiro',
    date: new Date().toISOString(),
    done: false,
    tagIcon: Home,
    tagName: 'Casa',
  },
  {
    id: 3,
    description: 'Fazer a janta',
    date: new Date().toISOString(),
    done: false,
    tagIcon: Home,
    tagName: 'Casa',
  },
  {
    id: 4,
    description: 'Ver aula do MBA',
    date: new Date().toISOString(),
    done: false,
    tagIcon: PersonStanding,
    tagName: 'Pessoal',
  },
  {
    id: 5,
    description: 'Pegar dados diretamente da API',
    date: new Date().toISOString(),
    done: false,
    tagIcon: PersonStanding,
    tagName: 'Pessoal',
  },
]

export function TasksList() {
  return (
    <div className="p-10 flex flex-col gap-2">
      {tasks.map((task) => {
        return <TasksListItem key={task.id} task={task} />
      })}
    </div>
  )
}
