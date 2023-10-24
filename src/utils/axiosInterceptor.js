import axios from 'axios';
// import {baseURL} from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosAuth = axios.create({
  baseURL,
});

axiosAuth.interceptors.request.use(
  async config => {
    let token = await AsyncStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosAuth.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshAccessToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      return axiosAuth(originalRequest);
    }
    return Promise.reject(error);
  },
);

const axiosWithoutAuth = axios.create({
  baseURL,
});

export {axiosAuth, axiosWithoutAuth};
