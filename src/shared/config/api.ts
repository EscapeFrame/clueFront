import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const accesToken = localStorage.getItem('accessToken');

//로그인 했을 때
const Customapi = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    Authorization: `${accesToken}`
  }
});

//url 설정, header 공통으로 담을 것, timeout설정

export default Customapi;