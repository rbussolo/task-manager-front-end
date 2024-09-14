import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { GroupsTable } from './groups-table'

export function Groups() {
  return (
    <>
      <Card className="w-full lg:w-[816px]">
        <CardHeader className="pb-2">
          <CardTitle>Grupos</CardTitle>
          <CardDescription>
            Aqui você consegue editar ou excluir um determinado grupo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GroupsTable />
        </CardContent>
      </Card>
    </>
  )
}
