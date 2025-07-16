import axios from 'axios';


const baseUrl = import.meta.env.VITE_API_BASE_URL;
const accesToken = localStorage.getItem('accessToken');

const Customapi = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    Authorization: `${accesToken}`
  }
});

export default Customapi;