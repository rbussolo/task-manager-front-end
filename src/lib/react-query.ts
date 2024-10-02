import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export interface GenerateKeyCacheToTasksProps {
  important?: boolean
  completed?: boolean
  group_slug?: string
}

export type KeyCacheTasks = [string, GenerateKeyCacheToTasksProps]

export function generateKeyCacheToTasks(filters: GenerateKeyCacheToTasksProps) {
  const keyCache = ['tasks', filters] as KeyCacheTasks

  return keyCache
}
