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

  const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6ImM2YWYyNWVlLTBkYWQtNDJlZS04NWYzLWQ3YjFhZDY4YzEwYyIsInVzZXJuYW1lIjoiYWRtaW4yIiwicm9sZSI6IlRFQUNIRVIiLCJpYXQiOjE3NTczMTg1NzgsImV4cCI6MTc1NzY3ODU3OH0.zIKpZ_79uerS4gvqz4y0YC4NyIwlaZe93u5jNfpFAzI';
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
  // // 사용자 정보 자동 초기화
  // useEffect(() => {
  //   // user가 비어있으면 TEST_USER로 초기화
  //   if (!user.role) {
  //     setUser(TEST_USER);
  //     setAccessToken(TEST_TOKEN);
  //     localStorage.setItem('accessToken', TEST_TOKEN);
  //   }
  // }, []);
  // // }, [user.role, setUser]);
  // 사용자 정보가 비어있으면 즉시 초기화
  if (!user.role) {
    setUser(TEST_USER);
    setAccessToken(TEST_TOKEN);
    localStorage.setItem('accessToken', TEST_TOKEN);
  }

  // 토큰은 있으나 유저 정보가 없을 경우
  useEffect(() => {
    const fetchUserInfo = async () => {
      // 토큰 없을 시 로그인으로
      if (!accessToken) {
        console.log('accessToken 없음');
        return;
      }

      if (user.role) return; // role이 있으면 이미 설정됨

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
  }, [accessToken, user.role, setUser]);

  return { accessToken, user, setAuthInfo, removeAuthInfo };
};