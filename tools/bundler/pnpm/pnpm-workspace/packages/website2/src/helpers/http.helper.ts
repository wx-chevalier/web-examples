import axios, { AxiosRequestConfig } from 'axios';
import jwt from './jwt.helper';

const bearerTokenInterceptor = (value: AxiosRequestConfig) => {
  const hasAuthHeader = Object.keys(value.headers.common).includes('Authorization');
  const isAuthenticated = jwt.isAuthenticated();
  const token = localStorage.getItem('access_token');
  if (!hasAuthHeader && isAuthenticated) {
    value.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return value;
}

export const $http = axios.create({
  baseURL: 'http://localhost:5001/',
  headers: {
    'Content-Type': 'application/json'
  }
})
$http.interceptors.request.use(bearerTokenInterceptor);