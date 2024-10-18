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
  priority: '' | 'Baixa' | 'Média' | 'Alta'
  onPriorityChange: (priority: '' | 'Baixa' | 'Média' | 'Alta') => void
  allowEmptyValue?: boolean
  className?: string
}

export function TaskSelectPriority({
  priority,
  onPriorityChange,
  allowEmptyValue = false,
  className = '',
}: TaskSelectPriorityProps) {
  function handleChangeValue(value: string) {
    const newValue = value === 'empty' ? '' : value

    if (
      newValue !== '' &&
      newValue !== 'Baixa' &&
      newValue !== 'Média' &&
      newValue !== 'Alta'
    ) {
      return
    }

    onPriorityChange(newValue)
  }

  return (
    <Select
      value={priority}
      onValueChange={(value) => handleChangeValue(value)}
    >
      <SelectTrigger className={`w-full ${className}`}>
        <SelectValue placeholder="Sem prioridade" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Selecione a prioridade</SelectLabel>
          {allowEmptyValue && (
            <SelectItem value="empty">Sem prioridade</SelectItem>
          )}

          <SelectItem value="Baixa">Baixa</SelectItem>
          <SelectItem value="Média">Média</SelectItem>
          <SelectItem value="Alta">Alta</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
