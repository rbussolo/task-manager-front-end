import { api } from "../../services/api";
import { IRequestError, IRequestLogin, IUser } from "./types";

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUserLocalStorage(): IUser | null {
  const json = localStorage.getItem('user');

  if(!json) {
    return null;
  }

  const user = JSON.parse(json);

  return user ?? null;
}

const LoginRequest = async (login: string, password: string): Promise<IRequestError | IRequestLogin> => {
  const result = await api.request({ method: "post", url: 'auth/sign', data: { login, password } });
  
  if ('message' in result) {
    return result as IRequestError;
  }

  return result as unknown as IRequestLogin;
}

export { LoginRequest };