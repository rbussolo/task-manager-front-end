import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

import { api } from '../../lib/api'
import styles from './index.module.css'
import PopupTask from './PopupTask'
import { TaskList } from './TaskList'
import { TaskSearch } from './TaskSearch'

export interface ITask {
  id: number
  title: string
  description: string | null
  priority: string
  category: string | null
  dueDate: string | null
  completed: boolean
}

export interface IFiltersTask {
  title?: string
  description?: string | null
  priority?: string
  category?: string | null
  dueDate?: Date | string | null
}

export function Task() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [filters, setFilters] = useState<IFiltersTask>({})
  const [order, setOrder] = useState('')

  const [open, setOpen] = useState(false)
  const [taskId, setTask] = useState(0)

  const handleCloseTask = () => {
    fetchData()
    setOpen(false)
  }

  function fetchData() {
    api
      .get('/tasks', {
        params: {
          title: filters?.title,
          description: filters?.description,
          priority: filters?.priority,
          category: filters?.category,
          dueDate: filters?.dueDate,
          order,
        },
      })
      .then((response) => {
        setTasks(response.data)
      })
  }

  function handleTaskCompleted(taskId: number) {
    api.patch(`/task/${taskId}/completed`).then(() => {
      fetchData()
    })
  }

  function handleNewTask() {
    setTask(0)
    setOpen(true)
  }

  function handleTaskEdit(taskId: number) {
    setTask(taskId)
    setOpen(true)
  }

  function handleTaskDelete(taskId: number) {
    api.delete(`/task/${taskId}`).then(() => {
      fetchData()
    })
  }

  function handleSearchTask(filters: IFiltersTask) {
    setFilters(filters)
  }

  function handleOrderSelected(newOrder: string) {
    setOrder(newOrder)
  }

  useEffect(() => {
    fetchData()
  }, [filters, order])

  return (
    <>
      <Box className={styles.container}>
        <TaskSearch
          onClickNewTask={handleNewTask}
          onClickSearch={handleSearchTask}
        />

        <TaskList
          tasks={tasks}
          order={order}
          onOrderChange={handleOrderSelected}
          onTaskComplete={handleTaskCompleted}
          onTaskEdit={handleTaskEdit}
          onTaskDelete={handleTaskDelete}
        />
      </Box>

      <PopupTask isOpen={open} onClose={handleCloseTask} taskId={taskId} />
    </>
  )
}
