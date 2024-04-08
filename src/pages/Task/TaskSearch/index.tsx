import { useState } from "react";

import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"

import { TaskPriority } from "../../../utils/TaskPriority";
import { categoryList } from "../../../utils/CategoryList";
import { IFiltersTask } from "..";

import styles from './index.module.css';

interface TaskSearchProps {
  onClickNewTask: () => void;
  onClickSearch: (filters: IFiltersTask) => void;
}

export function TaskSearch({ onClickNewTask, onClickSearch }: TaskSearchProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority | "">("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  function handleSearchTask() {
    const filters: IFiltersTask = {
      title,
      category,
      description,
      dueDate,
      priority
    }

    onClickSearch(filters);
  }

  return (
    <Box className={styles.filterContainer}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box className={styles.filterHeader}>
            <Typography variant="h4" component="h2">
              Consultar tarefas
            </Typography>

            <Button
              type="button"
              variant="contained"
              size="large"
              onClick={onClickNewTask}
            >
              Nova Tarefa
            </Button>
          </Box>
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
            style={{ height: '3.5rem' }}
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
            <FormControl style={{ flexGrow: 1 }}>
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
  )
}