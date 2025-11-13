import axios, { InternalAxiosRequestConfig } from 'axios';
import qs from 'qs';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const controllerMap = new Map<string, AbortController>();

// Refresh 토큰 함수
const refreshAccesToken = async () => {
  const res = await axios.post(`${baseUrl}/refresh-token`, null, {
    withCredentials: true,
  });
  return res.headers['authorization']?.replace('Bearer ', '');
};

const Customapi = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// 요청 인터셉터
Customapi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers ?? {};

    // key: 메서드 + URL + params/data
    const key = `${config.method}:${config.url}?${qs.stringify(config.params || config.data || {})}`;

    // 이전 요청 취소
    const prev = controllerMap.get(key);
    if (prev) {
      prev.abort();
      controllerMap.delete(key);
    }

    const controller = new AbortController();
    config.signal = controller.signal;
    controllerMap.set(key, controller);

    // accessToken 추가
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
Customapi.interceptors.response.use(
  (res) => {
    const key = `${res.config.method}:${res.config.url}`;
    controllerMap.delete(key);
    return res;
  },
  async (error) => {
    if (error.config) {
      const key = `${error.config.method}:${error.config.url}`;
      controllerMap.delete(key);
    }

    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const isExpired = error.response?.status === 401;

    if (isExpired && !original._retry) {
      original._retry = true;
      try {
        const newToken = await refreshAccesToken();
        if (newToken) {
          localStorage.setItem('accessToken', newToken);
          original.headers['Authorization'] = `Bearer ${newToken}`;
          return Customapi(original);
        }
      } catch (err) {
        console.error('Refresh token 실패:', err);
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
      console.warn('요청이 취소됨:', error.config?.url);
      return;
    }

    return Promise.reject(error);
  }
);

export default Customapi;
