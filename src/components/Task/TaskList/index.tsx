import { Box, Button, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './index.module.css';
import { ITask } from "..";
import { TaskPriority } from "../../../utils/TaskPriority";
import { format } from "date-fns";

interface TaskListProps {
  tasks: ITask[];
  order: string;
  onOrderChange: (order: string) => void;
  onTaskComplete: (taskId: number) => void;
  onTaskEdit: (taskId: number) => void;
  onTaskDelete: (taskId: number) => void;
}

export function TaskList({ tasks, order, onOrderChange, onTaskComplete, onTaskEdit, onTaskDelete }: TaskListProps) {
  const countTasks = tasks.length;
  const countTasksCompleted = tasks.reduce((resultado, task) => {
    return (resultado + (task.completed ? 1 : 0));
  }, 0);

  return (
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

        <FormControl style={{ width: '200px' }}>
          <InputLabel id="order-label">Ordernar</InputLabel>
          <Select
            labelId="order-label"
            id="order"
            label="Ordenar"
            value={order}
            onChange={event => onOrderChange(event.target.value)}
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
                      style={{ minWidth: 'auto' }}
                      color={task.completed ? "success" : "warning"}
                      onClick={() => onTaskComplete(task.id)}
                    >
                      <Icon />
                    </Button>

                    <Button
                      type="button"
                      style={{ minWidth: 'auto' }}
                      onClick={() => onTaskEdit(task.id)}
                    >
                      <EditIcon />
                    </Button>

                    <Button
                      type="button"
                      style={{ minWidth: 'auto' }}
                      onClick={() => onTaskDelete(task.id)}
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
  );
}