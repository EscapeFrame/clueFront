import { useEffect, useState, useCallback } from 'react';
import CustomApi from '@/shared/config/api';
import { userState } from '@/shared/model/userState';
import { useRecoilState } from 'recoil';

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));

  const [user, setUser] = useRecoilState(userState);

  // 로그인시 사용자 정보 및 토큰 세팅
  const setAuthInfo = useCallback((accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }, []);

  // 로그아웃
  const removeAuthInfo = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser({ username: "", userId: "", role: "" });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }, [setUser]);
  
  // 토큰은 있으나 유저 정보가 없을 경우
  useEffect(() => {
    const fetchUserInfo = async () => {
      // 토큰 없을 시 로그인으로
      if (!accessToken) {
        console.log('accessToken 없음');
        return;
      }

      if (user?.userId) return;

      try {
        const res = await CustomApi.get('/api/user/me');
        const userData = res.data;
        setUser({
          userId: userData.userId,
          username: userData.username,
          role: userData.role,
        });
      } catch (error) {
        console.error('유저 정보 조회 실패: ', error);
      }
    };
    fetchUserInfo();
  }, [accessToken, user, removeAuthInfo, setUser]);
  return { accessToken, refreshToken, user, setAuthInfo, removeAuthInfo };
};