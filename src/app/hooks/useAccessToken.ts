import { useEffect, useState, useCallback } from 'react';
import Customapi from '@/shared/config/api';
import { userState } from '@/shared/model/userState';
import { useRecoilState } from 'recoil';

export const useAuth = (): any => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  // 로그인 시 토큰 저장 및 사용자 정보 조회
  const setAuthInfo = useCallback(async (accessToken: string) => {
    setAccessToken(accessToken);
    localStorage.setItem('accessToken', accessToken);

    // 새로운 토큰으로 사용자 정보를 즉시 조회
    try {
      const res = await Customapi.get('/api/user/me', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const userData = res.data;
      setUser({
        userId: userData.userId,
        username: userData.username,
        role: userData.role,
      });
    } catch (error) {
      console.error('setAuthInfo에서 유저 정보 조회 실패:', error);
      // 실패 시 토큰 및 유저 정보 초기화
      removeAuthInfo();
    }
  }, []);

  // 로그아웃
  const removeAuthInfo = useCallback(() => {
    setAccessToken(null);
    setUser({ username: "", userId: "", role: "" });
    localStorage.removeItem('accessToken');
  }, [setUser]);
  
  // 토큰은 있으나 유저 정보가 없을 경우
  useEffect(() => {
    // localStorage의 accessToken 변경을 감지하는 이벤트 리스너
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'accessToken') {
        setAccessToken(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!accessToken || user.userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await Customapi.get('/api/user/me');
        const userData = res.data;
        setUser({
          userId: userData.userId,

          username: userData.username,
          role: userData.role,
        });
      } catch (error) {
        // 401 에러가 아니고, 재시도 요청도 아닌 경우에만 로그아웃 처리
        if (error.response?.status !== 401 && !error.config?._retry) {
          console.error('유저 정보 조회 실패, 로그아웃 처리: ', error);
          // 이 경우 토큰이 유효하지 않다고 판단하여 로그아웃 처리
          removeAuthInfo();
        }
      } finally {
        setLoading(false);
      }

    };

    fetchUserInfo();
  }, [accessToken, user.userId, setUser, removeAuthInfo]);

  return { accessToken, user, setAuthInfo, removeAuthInfo, loading };
};