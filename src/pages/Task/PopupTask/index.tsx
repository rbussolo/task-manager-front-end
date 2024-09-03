import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { DatePicker } from '@mui/x-date-pickers'
import { useEffect, useState } from 'react'

import { Loading } from '@/components/loading'

import PopupAlert, { PopupAlertType } from '../../../components/PopupAlert'
import { api } from '../../../lib/api'
import { categoryList } from '../../../utils/CategoryList'
import { TaskPriority } from '../../../utils/TaskPriority'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
}

interface PopupTaskProps {
  taskId?: number
  isOpen: boolean
  onClose: () => void
}

interface ITask {
  title: string
  description?: string
  priority: TaskPriority
  category?: string
  dueDate: Date | null
}

export default function PopupTask({ taskId, isOpen, onClose }: PopupTaskProps) {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.Lower)
  const [category, setCategory] = useState<string>('')
  const [dueDate, setDueDate] = useState<Date | null>(new Date())

  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<PopupAlertType>('success')
  const [alertCloseOnExit, setAlertCloseOnExit] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const pageTitle = !taskId ? 'Adicionar nova tarefa' : 'Editando uma tarefa'

  useEffect(() => {
    // Apenas necessário realizar alguma coisa, caso esteja abrindo o popup
    if (!isOpen) return

    // Limpa os dados referente a tarefa
    setTitle('')
    setDescription('')
    setPriority(TaskPriority.Lower)
    setCategory('')
    setDueDate(new Date())

    // Caso esteja editando uma tarefa, necessário carregar dados dela
    if (taskId && taskId > 0) {
      fetchTask()
    }
  }, [taskId, isOpen])

  function fetchTask() {
    setIsLoading(true)

    api
      .get(`/task/${taskId}`)
      .then((response) => {
        setTitle(response.data.title)
        setDescription(response.data.description)
        setPriority(response.data.priority)
        setCategory(response.data.category)
        setDueDate(
          response.data.dueDate ? new Date(response.data.dueDate) : null,
        )
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message
          ? error.response.data.message
          : 'Ocorreu um erro no de comunicação, favor tente novamente mais tarde!'

        showAlert('error', errorMessage, true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function showAlert(
    type: PopupAlertType,
    message: string,
    closeOnExit = false,
  ) {
    setAlertCloseOnExit(closeOnExit)
    setAlertType(type)
    setAlertMessage(message)
    setAlertOpen(true)
  }

  const handleCloseAlert = () => {
    setAlertOpen(false)

    if (alertCloseOnExit) {
      onClose()
    }
  }

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const task: ITask = {
      title,
      description,
      priority,
      category,
      dueDate,
    }

    const isEditing = !!(taskId && taskId > 0)
    const response = isEditing
      ? api.patch(`/task/${taskId}`, task)
      : api.post('/task', task)

    response
      .then(() => {
        showAlert('success', 'Operação realizado com sucesso!', true)
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message
          ? error.response.data.message
          : 'Ocorreu um erro no de comunicação, favor tente novamente mais tarde!'

        showAlert('error', errorMessage)
      })
  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {pageTitle}
          </Typography>

          <hr style={{ marginTop: '0.5rem', marginBottom: '1rem' }} />

          <form autoComplete="off" onSubmit={handleCreateNewTask}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                required
                id="title"
                label="Titulo"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                fullWidth
              />

              <TextField
                id="description"
                label="Descrição"
                fullWidth
                multiline
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={3}
              />

              <ToggleButtonGroup
                value={priority}
                exclusive
                onChange={(event, newPriority) => setPriority(newPriority)}
                aria-label="text alignment"
                fullWidth
              >
                <ToggleButton value={TaskPriority.Lower} color="success">
                  Baixa
                </ToggleButton>
                <ToggleButton value={TaskPriority.Medium} color="warning">
                  Média
                </ToggleButton>
                <ToggleButton value={TaskPriority.High} color="error">
                  Alta
                </ToggleButton>
              </ToggleButtonGroup>

              <Box display="flex" gap={2}>
                <FormControl style={{ flexGrow: 1 }}>
                  <InputLabel id="category-label">Categoria</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    value={category}
                    label="Categoria"
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <MenuItem value={''}>Selecione</MenuItem>

                    {categoryList.map((c) => {
                      return (
                        <MenuItem key={c} value={c}>
                          {c}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>

                <DatePicker
                  label="Data de Vencimento"
                  views={['day', 'month', 'year']}
                  onChange={(newDueDate) => setDueDate(newDueDate)}
                />
              </Box>

              <Box display="flex" gap={2}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="success"
                  size="large"
                >
                  Salvar
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={onClose}
                  size="large"
                >
                  Fechar
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>

      <PopupAlert
        isOpen={alertOpen}
        message={alertMessage}
        type={alertType}
        onClose={handleCloseAlert}
      />
      <Loading isLoading={isLoading} />
    </>
  )
}
