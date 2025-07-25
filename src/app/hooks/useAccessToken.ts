import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem('accessToken');
  });

  // STUDENT JWT 발급
  useEffect(() => {
    const getJwtToken = async () => {
      try {
        const response = await axios.post(
          'http://10.129.57.64:8080/test?userId=1&username=김우성&role=STUDENT'
        );
        const token = response.headers.authorization;
        setAccessToken(token);
      } catch (error: any) {
        console.error('STUDENT JWT 발급 실패:', error.response?.data || error.message);
      }
    };

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      getJwtToken();
      localStorage.removeItem('accessToken');
    }
  }, []);

  // TEACHER JWT 발급
  useEffect(() => {
    const getJwtToken = async () => {
      try {
        const response = await axios.post(
          'http://10.129.57.64:8080/test?userId=6&username=김기태&role=TEACHER'
        );
        const token = response.headers.authorization;
        localStorage.setItem('TaccessToken', token);
      } catch (error: any) {
        console.error('TEACHER JWT 발급 실패:', error.response?.data || error.message);
      }
    };

    if (!localStorage.getItem('TaccessToken')) {
      getJwtToken();
    }
  }, []);

  // Refresh Token 처리
  useEffect(() => {
    if (!accessToken) {
      (async () => {
        try {
          const res = await axios.post(
            "http://localhost:8080/refresh-token",
            {},
            { withCredentials: true }
          );
          const authHeader = res.headers["authorization"];
          if (authHeader) {
            const token = authHeader.split(" ")[1];
            localStorage.setItem("accessToken", token);
            setAccessToken(token);
          }
        } catch (err) {
          console.warn("자동 리프레시 실패:", err);
        }
      })();
    }
  }, [accessToken]);

  return { accessToken, setAccessToken };
};