import { ptBR } from 'date-fns/locale'

import { DateTimePicker } from '@/components/ui/date-time-picker'

interface TaskCalendarProps {
  date: Date | undefined
  onDateChange: (date: Date | undefined) => void
}

export function TaskCalendar({ date, onDateChange }: TaskCalendarProps) {
  return (
    <>
      <DateTimePicker
        locale={ptBR}
        hourCycle={24}
        value={date}
        onChange={onDateChange}
        placeholder="Informe o prazo final"
      />
    </>
  )
}
