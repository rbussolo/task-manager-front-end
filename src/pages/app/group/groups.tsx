import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Pencil, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { deleteGroup } from '@/api/delete-group'
import { getGroups, IGroup } from '@/api/get-groups'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { convertErrorToString } from '@/utils/error-to-toast'

export function Groups() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups,
  })

  const { mutateAsync: deleteGroupFn } = useMutation({
    mutationFn: deleteGroup,
  })

  async function handleDelete(id: number) {
    try {
      await deleteGroupFn({ id })

      deleteGroupFromCache(id)

      toast.success('Registro removido com sucesso!')
    } catch (error) {
      toast.error(convertErrorToString(error))
    }
  }

  function deleteGroupFromCache(id: number) {
    const cached = queryClient.getQueryData<IGroup[]>(['groups'])

    if (!cached) return

    const newCached = cached.filter((group) => !(group.id === id))
    queryClient.setQueryData<IGroup[]>(['groups'], newCached)
  }

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
                  return (
                    <TableRow key={group.id}>
                      <TableCell className="font-medium">
                        {group.name}
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Link to={`/group/${group.id}`}>
                          <Button variant="default">
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(group.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
