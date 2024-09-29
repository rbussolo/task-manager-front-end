import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface TaskSelectPriorityProps {
  priority: 'Baixa' | 'Média' | 'Alta'
  onPriorityChange: (priority: 'Baixa' | 'Média' | 'Alta') => void
}

export function TaskSelectPriority({
  priority,
  onPriorityChange,
}: TaskSelectPriorityProps) {
  function handleChangeValue(value: string) {
    if (value !== 'Baixa' && value !== 'Média' && value !== 'Alta') {
      return
    }

    onPriorityChange(value)
  }

  return (
    <Select
      value={priority}
      onValueChange={(value) => handleChangeValue(value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Prioridade" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Selecione a prioridade</SelectLabel>
          <SelectItem value="Baixa">Baixa</SelectItem>
          <SelectItem value="Média">Média</SelectItem>
          <SelectItem value="Alta">Alta</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
