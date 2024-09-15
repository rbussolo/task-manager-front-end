import { useQuery } from '@tanstack/react-query'

import { getGroups } from '@/api/get-groups'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Skeleton } from './ui/skeleton'

interface GroupListSelectProps {
  groupId: number | undefined
  onChange: (id: number | undefined) => void
}

export function GroupListSelect({ groupId, onChange }: GroupListSelectProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups,
  })

  if (isLoading) {
    return <Skeleton className="w-full h-10" />
  }

  const value = groupId ? groupId.toString() : '0'

  function handleChangeValue(value: string) {
    const v: number | undefined = parseInt(value) > 0 ? parseInt(value) : undefined;

    onChange(v)
  }

  return (
    <>
      <Select
        value={value}
        onValueChange={handleChangeValue}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione um grupo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Nenhum grupo</SelectItem>
          {data?.map((group) => {
            return (
              <SelectItem key={group.id} value={group.id.toString()}>
                <div className="flex flex-row align-middle gap-2">
                  <img src={group.icon} alt={group.name} /> {group.name}
                </div>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </>
  )
}
