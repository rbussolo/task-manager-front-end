import { Box, Button, TextField, Typography } from "@mui/material";

import styles from './index.module.css';
import { FormEvent, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider/useAuth";
import { useNavigate } from "react-router-dom";
import PopupAlert from "../../components/PopupAlert";
import Loading from "../../components/Loading";

export function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    auth.authenticate(login, password).then(() => {
      navigate("/tasks");
    }).catch(error => {
      const errorMessage = error.response?.data?.message ? error.response.data.message : "Ocorreu um erro no de comunicação, favor tente novamente mais tarde!";

      setAlertOpen(true);
      setAlertMessage(errorMessage);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <>
      <Box className={styles.container}>
        <form onSubmit={handleLogin}>
          <Box className={styles.containerLogin}>
            <Typography variant="h6" component="h2">
              Task Manager
            </Typography>

            <TextField
              id="login"
              label="Login"
              fullWidth
              value={login}
              onChange={event => setLogin(event.target.value)}
              required
            />

            <TextField
              id="password"
              label="Senha"
              type="password"
              fullWidth
              value={password}
              onChange={event => setPassword(event.target.value)}
              required
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Acessar
            </Button>
          </Box>
        </form>
      </Box>

      <PopupAlert isOpen={alertOpen} message={alertMessage} type="error" onClose={handleCloseAlert} />
      <Loading isLoading={isLoading} />
    </>
  )
}