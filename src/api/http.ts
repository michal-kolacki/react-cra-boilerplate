import axios, { AxiosRequestConfig } from 'axios';
import { localStorageTokenKey } from '../providers/auth/AuthProvider';

const http = () => {
  const config: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
    timeout: 120000,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem(localStorageTokenKey) || '',
    },
  };
  const axiosInstance = axios.create(config);
  axiosInstance.interceptors.response.use(
    (response) => response,
    (err) => {
      if (err && err.response && err.response.status) {
        if (err.response.status === 403) {
          localStorage.removeItem(localStorageTokenKey);
          document.location.href = process.env.REACT_APP_TRAINEST_URL || '/';
        }
      }
      return Promise.reject(err);
    }
  );
  return axiosInstance;
};

export default http;
