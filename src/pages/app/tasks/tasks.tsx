import { useSearchParams } from 'react-router-dom'

import { TasksList } from './tasks-list'

export function Tasks() {
  const [searchParms] = useSearchParams()

  const isImportant = searchParms.get('important') !== null
  const tagName = isImportant ? '#Importante' : ''

  return (
    <div className="flex flex-col w-full h-full">
      <div className="p-10 flex flex-col justify-center bg-slate-200 min-h-[150px]">
        <h3 className="text-3xl">Tarefas</h3>
        {tagName && <h4 className="text-sm">{tagName}</h4>}
      </div>
      <TasksList />
    </div>
  )
}
