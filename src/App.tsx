import './globals.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { AuthProvider } from './contexts/AuthProvider'
import { queryClient } from './lib/react-query'
import { RoutesApp } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider defaultTheme="light" storageKey="task-manager-theme">
          <Helmet titleTemplate="%s | task.manager" />
          <Toaster richColors />

          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <RoutesApp />
            </AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}
