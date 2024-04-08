import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import NewTask from "../NewTask";

export function Header() {
  const [open, setOpen] = useState(false);
  const handleOpenNewTask = () => setOpen(true);
  const handleCloseNewTask = () => setOpen(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button color="inherit" onClick={handleOpenNewTask}>
            Nova Tarefa
          </Button>
        </Toolbar>
      </AppBar>
    
      <NewTask isOpen={open} onClose={handleCloseNewTask} />
    </Box>
  )
}