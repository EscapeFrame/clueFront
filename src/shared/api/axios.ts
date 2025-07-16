import axios from 'axios';


const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Customapi = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

export default Customapi;