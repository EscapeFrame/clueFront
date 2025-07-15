import axios from 'axios';


const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Classapi = axios.create({
  baseURL: baseUrl+'api/class',
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