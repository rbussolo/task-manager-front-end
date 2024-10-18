import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { TaskSelectPriority } from './task-select-priority'

type PriorityType = '' | 'Baixa' | 'Média' | 'Alta'

const tasksFiltersForm = z.object({
  title: z.string().optional(),
  priority: z.enum(['', 'Baixa', 'Média', 'Alta']),
  sort: z.string().optional(),
})

type TasksFiltersForm = z.infer<typeof tasksFiltersForm>

export function TasksFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  function isPriorityType(priority: string | null): priority is PriorityType {
    if (priority === null) {
      return false
    }

    return ['', 'Baixa', 'Média', 'Alta'].includes(priority)
  }

  function getPriority(priority: string | null): PriorityType {
    if (!isPriorityType(priority)) {
      return ''
    }

    return ['', 'Baixa', 'Média', 'Alta'].filter(
      (value) => value === priority,
    )[0] as PriorityType
  }

  const title = searchParams.get('title')
  const priority: PriorityType = getPriority(searchParams.get('priority'))
  const sort = searchParams.get('sort')

  const { handleSubmit, register, reset, setValue, watch } =
    useForm<TasksFiltersForm>({
      resolver: zodResolver(tasksFiltersForm),
      defaultValues: {
        title: title ?? '',
        priority: priority ?? '',
        sort: sort ?? '',
      },
    })

  function handleFilters({ title, priority, sort }: TasksFiltersForm) {
    setSearchParams((prev) => {
      if (title) {
        prev.set('title', title)
      } else {
        prev.delete('title')
      }

      if (priority) {
        prev.set('priority', priority)
      } else {
        prev.delete('priority')
      }

      if (sort) {
        prev.set('sort', sort)
      } else {
        prev.delete('sort')
      }

      return prev
    })
  }

  function handleCleanFilters() {
    setSearchParams((prev) => {
      prev.delete('title')
      prev.delete('priority')
      prev.delete('sort')

      return prev
    })

    reset({
      title: '',
      priority: '',
      sort: '',
    })
  }

  const prioritySelect = watch('priority')

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilters)}
    >
      <Label htmlFor="title" className="h-8 w-auto flex items-center">
        Titulo:
      </Label>
      <Input
        id="title"
        className="h-8 w-auto"
        type="text"
        {...register('title')}
      />

      <Label htmlFor="title" className="h-8 w-auto flex items-center">
        Prioridade:
      </Label>
      <TaskSelectPriority
        className="h-8 w-[150px]"
        priority={prioritySelect}
        allowEmptyValue={true}
        onPriorityChange={(value) => setValue('priority', value)}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button
        onClick={handleCleanFilters}
        type="button"
        variant="outline"
        size="xs"
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
