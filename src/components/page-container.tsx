import { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'

interface PageContainerProps {
  pageTitle?: string
  title: string
  description?: string
  children: ReactNode
}

export function PageContainer({
  pageTitle,
  title,
  description,
  children,
}: PageContainerProps) {
  return (
    <>
      {pageTitle && <Helmet title={title} />}

      <div className="flex flex-col w-full h-full">
        <div className="p-5 md:p-10 flex flex-col justify-center bg-slate-200 min-h-[150px]">
          <h3 className="text-3xl">{title}</h3>
          {description && <h4 className="text-sm">{description}</h4>}
        </div>

        <div className="p-2 md:p-10 flex flex-col gap-2">{children}</div>
      </div>
    </>
  )
}
