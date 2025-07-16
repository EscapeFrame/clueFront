import axios from 'axios';


const baseUrl = import.meta.env.VITE_API_BASE_URL;
const TaccesToken = localStorage.getItem('TaccessToken');

const TCustomapi = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    Authorization: `${TaccesToken}`
  }
});

export default TCustomapi;