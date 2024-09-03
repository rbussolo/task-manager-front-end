import { Outlet } from 'react-router-dom'

import { ThemeToggle } from '@/components/theme/theme-toggle'

export function AuthLayout() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background antialiased">
      <header className="flex justify-end p-5">
        <ThemeToggle />
      </header>

      <div className="flex justify-center items-center grow">
        <Outlet />
      </div>

      <footer className="flex justify-center text-sm p-2">
        Controle de tarefas &copy; task.manager - {new Date().getFullYear()}
      </footer>
    </div>
  )
}
