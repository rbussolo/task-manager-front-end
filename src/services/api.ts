import axios from 'axios';
import { getUserLocalStorage } from '../contexts/AuthProvider/util';

const BASE_URL = process.env.BACKEND_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  async (config) => {
    const user = getUserLocalStorage();
    
    if (user?.access_token) {
      config.headers!['Authorization'] = `Bearer ${user?.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)
