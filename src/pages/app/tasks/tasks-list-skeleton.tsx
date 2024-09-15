import { Skeleton } from '@mui/material'

export function TasksListSkeleton() {
  return (
    <div>
      <div className="h-[70px]">
        <Skeleton height="90px" className="w-full" />
      </div>

      <div className="h-[70px]">
        <Skeleton height="90px" className="w-full" />
      </div>

      <div className="h-[70px]">
        <Skeleton height="90px" className="w-full" />
      </div>

      <div className="h-[70px]">
        <Skeleton height="90px" className="w-full" />
      </div>
    </div>
  )
}
