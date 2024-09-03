import { Link } from 'react-router-dom'

interface HeaderMenuItemProps {
  to: string
  description: string
  amount?: number
  iconUrl: string
}

export function HeaderMenuItem({
  to,
  description,
  amount,
  iconUrl,
}: HeaderMenuItemProps) {
  return (
    <Link
      className="flex justify-between items-center cursor-pointer p-4 hover:bg-slate-300"
      to={to}
    >
      <div className="flex gap-2">
        <img src={iconUrl} alt={description} />
        <span>{description}</span>
      </div>
      {amount && amount > 0 ? (
        <div className="rounded-full p-1 bg-gray-100 border border-gray-300 min-w-8 flex justify-center items-center">
          {amount}
        </div>
      ) : (
        ''
      )}
    </Link>
  )
}
