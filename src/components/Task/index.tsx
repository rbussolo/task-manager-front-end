import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Table, TableBody, TableCell, TableHead, TableRow, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import styles from './index.module.css';
import { TaskPriority } from "../../utils/TaskPriority";
import { categoryList } from "../../utils/CategoryList";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { format } from "date-fns";

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NewTask from "../NewTask";

interface ITask {
  id: number;
  title: string;
  description: string | null;
  priority: string;
  category: string | null;
  dueDate: string | null;
  completed: boolean;
}

export function Task() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority | "">("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [order, setOrder] = useState("");

  const [tasks, setTasks] = useState<ITask[]>([]);
  
  const [openEdit, setOpenEdit] = useState(false);
  const [taskIdEdit, setTaskEdit] = useState(0);
  const handleOpenEditTask = () => setOpenEdit(true);
  const handleCloseEditTask = () => setOpenEdit(false);

  function fetchData() {
    api.get("/tasks", { params: {
      title,
      description,
      priority,
      category,
      dueDate,
      order
    }}).then(response => {
      setTasks(response.data);
    });
  }

  function handleTaskCompleted(taskId: number) {
    api.patch(`/task/${taskId}/completed`)
    .then(() => {
      fetchData();
    });
  }

  function handleTaskEdit(taskId: number) {
    setTaskEdit(taskId);
    handleOpenEditTask();
  }

  function handleTaskDelete(taskId: number) {
    api.delete(`/task/${taskId}`)
      .then(() => {
        fetchData();
      });
  }

  function handleSearchTask() {
    fetchData();
  }

  function handleOrderSelected(event: SelectChangeEvent<string>) {
    setOrder(event.target.value);
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  const countTasks = tasks.length;
  const countTasksCompleted = tasks.reduce((resultado, task) => {
    return (resultado + (task.completed ? 1 : 0));
  }, 0);

  return (
    <>
      <Box className={styles.container}>
        <Box className={styles.filterContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" component="h2">
                Consultar tarefas
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                id="title"
                label="Titulo"
                fullWidth
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
            </Grid>
            
            <Grid item xs={12} md={8}>
              <TextField
                id="description"
                label="Descrição"
                fullWidth
                value={description}
                onChange={event => setDescription(event.target.value)}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <ToggleButtonGroup
                exclusive
                aria-label="text alignment"
                fullWidth
                style={{height: '3.5rem'}}
                value={priority}
                onChange={(event, newPriority) => setPriority(newPriority)}
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
            </Grid>

            <Grid item xs={12} md={8}>
              <Box display="flex" gap={2}>
                <FormControl style={{flexGrow: 1}}>
                  <InputLabel id="category-label">Categoria</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    label="Categoria"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <MenuItem value={""}>Selecione</MenuItem>

                    {categoryList.map((c) => {
                      return (
                        <MenuItem key={c} value={c}>{c}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>

                <DatePicker
                  label="Data de Vencimento"
                  views={['day', 'month', 'year']}
                  value={dueDate}
                  onChange={(newDueDate) => setDueDate(newDueDate)}
                />
              </Box>
            </Grid>
          </Grid>

          <Button
            type="button"
            variant="contained"
            size="large"
            onClick={handleSearchTask}
          >
            Consultar
          </Button>
        </Box>

        <Box className={styles.taskContainer}>
          <Box className={styles.taskOptions}>
            <Box className={styles.taskCount}>
              <Typography variant="body1" component="h2">
                Tarefas concluidas
              </Typography>
              <span>{countTasksCompleted}</span>
              <Typography variant="body1" component="h2">
                de
              </Typography>
              <span>{countTasks}</span>
            </Box>

            <FormControl style={{width: '200px'}}>
              <InputLabel id="order-label">Ordernar</InputLabel>
              <Select
                labelId="order-label"
                id="order"
                label="Ordenar"
                value={order}
                onChange={handleOrderSelected}
              >
                <MenuItem value="">Selecione</MenuItem>
                <MenuItem value="priority">Prioridade</MenuItem>
                <MenuItem value="category">Categoria</MenuItem>
                <MenuItem value="dueDate">Data de Vencimento</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box className={styles.taskList}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Titulo</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Data de Vencimento</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => {
                  const classPriority = (task.priority === TaskPriority.Lower ? styles.taskPriorityLower
                                      : task.priority === TaskPriority.Medium ? styles.taskPriorityMedium
                                      : task.priority === TaskPriority.High ? styles.taskPriorityHigh
                                      : '') + ' ' + (task.completed ? styles.taskCompleted : '');
                  const date = task.dueDate ? format(task.dueDate, "dd/MM/yyyy") : "";
                  const Icon = task.completed ? BookmarkAddedIcon : BookmarkIcon;
                  
                  return (
                    <TableRow
                      key={task.id}
                      className={classPriority}
                    >
                      <TableCell>{task.id}</TableCell>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>{task.category}</TableCell>
                      <TableCell>{date}</TableCell>
                      <TableCell align="center">
                          <Button 
                            type="button"
                            style={{minWidth: 'auto'}} 
                            color={task.completed ? "success" : "warning"}
                            onClick={() => handleTaskCompleted(task.id)}
                          >
                            <Icon />
                          </Button>

                          <Button
                            type="button"
                            style={{ minWidth: 'auto' }}
                            onClick={() => handleTaskEdit(task.id)}
                          >
                            <EditIcon />
                          </Button>

                          <Button
                            type="button"
                            style={{ minWidth: 'auto' }}
                            onClick={() => handleTaskDelete(task.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>
    
      <NewTask isOpen={openEdit} onClose={handleCloseEditTask} taskId={taskIdEdit} />
    </>
  )
}