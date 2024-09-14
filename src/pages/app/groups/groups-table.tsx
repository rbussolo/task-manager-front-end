import { useQuery } from '@tanstack/react-query'

import { getGroups } from '@/api/get-groups'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { GroupsTableRow } from './groups-table-row'

export function GroupsTable() {
  const { data, isLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups,
  })

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead className="w-[130px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          !isLoading &&
          data.map((group) => {
            return <GroupsTableRow key={group.id} group={group} />
          })}
      </TableBody>
    </Table>
  )
}
