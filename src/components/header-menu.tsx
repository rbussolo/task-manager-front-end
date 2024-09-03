import { useQuery } from '@tanstack/react-query'

import { getTasksAmount } from '@/api/get-tasks-amount'
import Briefcase from '@/assets/briefcase.svg'
import Calendar from '@/assets/calendar.svg'
import CirclePlus from '@/assets/circle-plus.svg'
import Clipboard from '@/assets/clipboard.svg'
import Home from '@/assets/home.svg'
import Star from '@/assets/star.svg'

import { HeaderMenuItem } from './header-menu-item'

export function HeaderMenu() {
  const { data } = useQuery({
    queryKey: ['tasks-amount'],
    queryFn: getTasksAmount,
  })

  const amount = data?.amount || 0
  const amountImportant = data?.amountImportant || 0
  const amountPlanned = data?.amountPlanned || 0

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
      <HeaderMenuItem
        to="/tasks?tag=house"
        description="Casa"
        iconUrl={Home}
        amount={5}
      />
      <HeaderMenuItem
        to="/tasks?tag=work"
        description="Trabalho"
        iconUrl={Briefcase}
        amount={2}
      />
      <HeaderMenuItem
        to="/group/add"
        description="Novo grupo"
        iconUrl={CirclePlus}
      />
    </div>
  )
}
