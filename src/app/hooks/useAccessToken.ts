import { useEffect, useState } from 'react';
import CustomApi from '@/shared/config/api';
import { User } from '@/entities/Context/LoginContext';
import { userState } from '@/shared/model/userState';
import { useRecoilState } from 'recoil';

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem('accessToken');
  });

  const [user, setUser] = useRecoilState(userState);

  const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6ImE3MTdiZmU4LWE5MzYtNDZkZi05NGEwLWUyZjBmNDUyYzk3YiIsInVzZXJuYW1lIjoi7Jyg6re87LCsIiwicm9sZSI6IlRFQUNIRVIiLCJpYXQiOjE3NTcxNzI2NDYsImV4cCI6MTc1NzUzMjY0Nn0.tdUJj3fiHuYJ9QWJn2P8-E50EToySaU0ucgf4L_PMlE';
  const TEST_USER: User = {
    userId: '2',
    username: '유근찬',
    role: 'TEACHER',
  };

  // 로그인시 사용자 정보 및 토큰 세팅
  // const setAuthInfo = (token: string, userInfo: User) => {
    const setAuthInfo = () => {
    localStorage.setItem('accessToken', TEST_TOKEN);
    setAccessToken(TEST_TOKEN);
    setUser(TEST_USER);
  };

  // 로그아웃
  const removeAuthInfo = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
    setUser({ username: "", userId: "", role: ""});
  };

  // 토큰은 있으나 유저 정보가 없을 경우
  useEffect(() => {
    const fetchUserInfo = async () => {
      // 토큰 없을 시 로그인으로
      if (!accessToken) {
        console.log('accessToken 없음');
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