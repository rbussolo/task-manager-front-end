import Apple from '@/assets/apple.svg'
import BadgeDollar from '@/assets/badge-dollar-sign.svg'
import Briefcase from '@/assets/briefcase.svg'
import Calendar from '@/assets/calendar.svg'
import Taxi from '@/assets/car-taxi-front.svg'
import Home from '@/assets/home.svg'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type IconSelect = {
  url: string
  description: string
}

let icons: IconSelect[] = [
  {
    url: Apple,
    description: 'Comida',
  },
  {
    url: BadgeDollar,
    description: 'Dinheiro',
  },
  {
    url: Calendar,
    description: 'Calendario',
  },
  {
    url: Home,
    description: 'Casa',
  },
  {
    url: Briefcase,
    description: 'Trabalho',
  },
  {
    url: Taxi,
    description: 'Transporte',
  },
]

icons = icons.sort((a, b) => {
  if (a.description > b.description) {
    return 1
  } else if (a.description < b.description) {
    return -1
  }

  return 0
})

interface GroupSelectIconProps {
  icon: string
  onChange: (value: string) => void
}

export function GroupSelectIcon({ icon, onChange }: GroupSelectIconProps) {
  return (
    <Select
      value={icon}
      onValueChange={(value) => {
        onChange(value)
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione um icone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Icones diponíveis:</SelectLabel>

          {icons.map((icon) => {
            return (
              <SelectItem key={icon.description} value={icon.url}>
                <div className="flex flex-row align-middle gap-2">
                  <img src={icon.url} alt={icon.description} />{' '}
                  {icon.description}
                </div>
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
