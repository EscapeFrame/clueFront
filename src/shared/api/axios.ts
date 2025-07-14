import axios from 'axios';

const Classapi = axios.create({
  baseURL: '/api/class',
  withCredentials: true,
});

Classapi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Classapi;