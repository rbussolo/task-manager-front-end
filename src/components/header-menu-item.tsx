import { LucideProps } from 'lucide-react'
import { Link } from 'react-router-dom'

interface HeaderMenuItemProps {
  to?: string
  handleClick?: () => void
  description: string
  amount?: number
  expanded: boolean
  IconUrl:
    | string
    | React.ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
      >
}

export function HeaderMenuItem({
  to,
  handleClick,
  description,
  amount,
  expanded,
  IconUrl,
}: HeaderMenuItemProps) {
  return (
    <Link
      className="flex justify-between items-center cursor-pointer p-4 hover:bg-slate-300 group overflow-hidden text-nowrap"
      to={to || '#'}
      onClick={handleClick}
    >
      <div className="flex gap-2">
        {typeof IconUrl === 'string' ? (
          <img src={IconUrl} alt={description} />
        ) : (
          <IconUrl />
        )}

        <span className={`md:block ${expanded ? 'block' : 'hidden'}`}>
          {description}
        </span>
      </div>
      {amount && amount > 0 ? (
        <div
          className={`rounded-full p-1 bg-gray-100 border border-gray-300 min-w-8 md:flex justify-center items-center ${expanded ? 'flex' : 'hidden'}`}
        >
          {amount}
        </div>
      ) : (
        ''
      )}
    </Link>
  )
}
