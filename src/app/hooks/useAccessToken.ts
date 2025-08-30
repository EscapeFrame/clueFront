import { useEffect, useState } from 'react';
import CustomApi from '@/shared/config/api';
import { User } from '@/entities/Context/LoginContext';
import { AiTwotoneAudio } from 'react-icons/ai';
import { Await } from 'react-router-dom';

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem('accessToken');
  });

  const [user, setUser] = useState<User | null>(null);

  // 로그인시 사용자 정보 및 토큰 세팅
  const setAuthInfo = (token: string, userInfo: User) => {
    localStorage.setItem('accessToken', token);
    setAccessToken(token);
    setUser(userInfo);
  };

  // 로그아웃
  const removeAuthInfo = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
    setUser(null);
  };

  // 토큰은 있으나 유저 정보가 없을 경우
  useEffect(() => {
    const fetchUserInfo = async () => {
      // 토큰 없을 시 로그인으로
      if (!accessToken) {
        console.log('accessToken 없음');
        window.location.href = '/login';
        return;
      }

      if (user) return;

      try {
        const res = await CustomApi.get('유저 정보');
        const userData = res.data;
        setUser({
          userId: userData.userId,
          username: userData.username,
          role: userData.role,
          myImage: userData.myImage || 'sample.jpg',
        });
      } catch (error) {
        console.error('유저 정보 조회 실패: ', error);
        removeAuthInfo();
      }
    };

    fetchUserInfo();
  }, [accessToken, user]);

  return { accessToken, user, setAuthInfo, removeAuthInfo };


};