import { jwtDecode } from "jwt-decode";
import { createContext, useMemo } from 'react';
import { IAuthProvider, IContext, IUser, IRequestError, IRequestLogin, AccessTokenDecoded } from './types';
import { getUserLocalStorage, setUserLocalStorage } from './util';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const AuthContext = createContext<IContext>({} as IContext);

const AuthProvider = ({ children }: IAuthProvider) => {
  const navigate = useNavigate();

  async function authenticate(login: string, password: string): Promise<IRequestError | IRequestLogin> {
    if (login === "") 
      return { message: "É necessário informar o E-mail do Usuário!" };

    if (password === "")
      return { message: "É necessário informar a Senha do Usuário!" };

    return new Promise((resolve, reject) => {
      api.post('auth/login', { 
        login, 
        password 
      }).then(response => {
        const result = response.data as IRequestLogin;
        const jwt_access = jwtDecode(result.access_token) as AccessTokenDecoded;

        const payload: IUser = {
          user: {
            id: jwt_access.sub,
            login: jwt_access.login
          },
          access_token: result.access_token,
          refresh_token: result.refresh_token
        }

        setUserLocalStorage(payload);

        resolve(result);
      }).catch(err => {
        reject(err);
      })
    });
  }

  function logout() {
    setUserLocalStorage(null);
    navigate("/login");
  }

  function getCurrentUser() {
    return getUserLocalStorage();
  }

  const value = useMemo(
    () => ({ authenticate, logout, getCurrentUser }),
    []
  );

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };