import axios from 'axios';

export function setupAxios() {
  axios.interceptors.request.use(config => {
    config.withCredentials = true;
    return config;
  });

  axios.interceptors.response.use(
    response => {
      if (response.data.success) {
        return response.data.content;
      } else {
        return Promise.reject(response.data.error);
      }
    },
    error => {
      return Promise.reject(error);
    }
  );
}
