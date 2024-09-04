import { useQuery } from '@tanstack/react-query'

import { getGroups } from '@/api/get-groups'
import { getTasksAmount } from '@/api/get-tasks-amount'
import Calendar from '@/assets/calendar.svg'
import CirclePlus from '@/assets/circle-plus.svg'
import Clipboard from '@/assets/clipboard.svg'
import Star from '@/assets/star.svg'

import { HeaderMenuItem } from './header-menu-item'

export function HeaderMenu() {
  const { data: amountOfTasks } = useQuery({
    queryKey: ['tasks-amount'],
    queryFn: getTasksAmount,
  })

  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups,
  })

  const amount = amountOfTasks?.amount || 0
  const amountImportant = amountOfTasks?.amountImportant || 0
  const amountPlanned = amountOfTasks?.amountPlanned || 0

  return (
    <div className="flex flex-col">
      <HeaderMenuItem
        to="/tasks"
        description="Tarefas"
        iconUrl={Clipboard}
        amount={amount}
      />
      <HeaderMenuItem
        to="/tasks?important"
        description="Importante"
        iconUrl={Star}
        amount={amountImportant}
      />
      <HeaderMenuItem
        to="/tasks?planned"
        description="Planejado"
        iconUrl={Calendar}
        amount={amountPlanned}
      />
      <hr />
      {groups &&
        groups.map((group) => (
          <HeaderMenuItem
            key={group.id}
            to={`/tasks?group=${group.name}`}
            description={group.name}
            iconUrl={group.icon}
            amount={0}
          />
        ))}

      <HeaderMenuItem
        to="/group/add"
        description="Novo grupo"
        iconUrl={CirclePlus}
      />
    </div>
  )
}
