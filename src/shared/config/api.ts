import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// // 개발시 활성화
// const baseUrl = '';

//로그인 했을 때
const Customapi = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});
//url 설정, header 공통으로 담을 것, timeout설정

// header에 필요시 accesToken 담도록 수정
Customapi.interceptors.request.use(
  (config) => {
    const accesToken = localStorage.getItem('accessToken');
    if (accesToken) {
      config.headers['Authorization'] = `Bearer ${accesToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

const refreshAccesToken = async () => {
  const res = await axios.post(
    `${baseUrl}/api/auth/refresh`,
    null,
    { withCredentials: true } // 쿠키에 refresh 토큰이 있을 시에만 필요
  );
  return res.headers['authorization'].replace('Bearer ', '');
};

Customapi.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    const isExpired = 
    error.response?.data?.message === "토큰 유효기간 만료" // 백엔드랑 똑같아야지만 작동한다 되어있음.

    if(isExpired && !original._retry) {
      original._retry = true;

      try {
        const newToken = await refreshAccesToken();
        if(newToken) {
          localStorage.setItem('accessToken', newToken);
          original.headers['Authorization'] = `Bearer ${newToken}`;
          return Customapi(original);
        }
      } catch (refreshError) {
        console.error("Refresh token 실패 : ", refreshError);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default Customapi;