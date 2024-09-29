import { Skeleton } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Bolt, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { getGroups } from '@/api/get-groups'
import { getTasksAmount } from '@/api/get-tasks-amount'
import { signOut } from '@/api/sign-out'
import Calendar from '@/assets/calendar.svg'
import CirclePlus from '@/assets/circle-plus.svg'
import Clipboard from '@/assets/clipboard.svg'
import Star from '@/assets/star.svg'

import { HeaderMenuItem } from './header-menu-item'

interface HeaderMenuProps {
  expanded: boolean
}

export function HeaderMenu({ expanded }: HeaderMenuProps) {
  const navigate = useNavigate()

  const { data: amountOfTasks } = useQuery({
    queryKey: ['tasks-amount'],
    queryFn: getTasksAmount,
  })

  const { data: groups, isLoading: isLoadingGroups } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups,
  })

  const { mutateAsync: signOutFn } = useMutation({
    mutationFn: signOut,
  })

  const amount = amountOfTasks?.amount || 0
  const amountImportant = amountOfTasks?.amountImportant || 0
  const amountPlanned = amountOfTasks?.amountPlanned || 0

  async function onLogoutClick() {
    await signOutFn()

    navigate('/sign-in')
  }

  return (
    <div className="flex flex-col">
      <HeaderMenuItem
        to="/tasks"
        description="Tarefas"
        IconUrl={Clipboard}
        amount={amount}
        expanded={expanded}
      />
      <HeaderMenuItem
        to="/tasks?important"
        description="Importante"
        IconUrl={Star}
        amount={amountImportant}
        expanded={expanded}
      />
      <HeaderMenuItem
        to="/tasks?planned"
        description="Planejado"
        IconUrl={Calendar}
        amount={amountPlanned}
        expanded={expanded}
      />

      <hr />

      {isLoadingGroups && <Skeleton className="w-full min-h-14" />}

      {groups &&
        groups.map((group) => {
          const groupAmount =
            amountOfTasks &&
            amountOfTasks?.groups.filter(
              (groupAmount) => groupAmount.group_id === group.id,
            )

          const amount =
            groupAmount && groupAmount.length > 0 ? groupAmount[0].amount : 0

          return (
            <HeaderMenuItem
              key={group.id}
              to={`/tasks?group=${group.slug}`}
              description={group.name}
              IconUrl={group.icon}
              amount={amount}
              expanded={expanded}
            />
          )
        })}

      <HeaderMenuItem
        to="/group"
        description="Novo grupo"
        IconUrl={CirclePlus}
        expanded={expanded}
      />

      <hr />

      <HeaderMenuItem
        to="/settings"
        description="Configuração"
        IconUrl={Bolt}
        amount={amountPlanned}
        expanded={expanded}
      />

      <HeaderMenuItem
        handleClick={onLogoutClick}
        description="Sair"
        IconUrl={LogOut}
        amount={amountPlanned}
        expanded={expanded}
      />
    </div>
  )
}
