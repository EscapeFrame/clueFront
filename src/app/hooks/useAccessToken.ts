import { useEffect, useState, useCallback } from 'react';
import Customapi from '@/shared/config/api';
import { userState } from '@/shared/model/userState';
import { useRecoilState } from 'recoil';
import { User } from '@/entities/Context/LoginContext';

interface AuthHook {
  accessToken: string | null;
  user: User;
  setAuthInfo: (accessToken: string) => void;
  removeAuthInfo: () => void;
  loading: boolean;
}

export const useAuth = (): AuthHook => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  // 로그인 시 토큰 저장
  const setAuthInfo = useCallback((accessToken: string) => {
    setAccessToken(accessToken);
    localStorage.setItem('accessToken', accessToken);
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
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await Customapi.get<{ userId: string; username: string; role: string }>('/api/user/me');
        const userData = res.data;
        setUser({
          userId: userData.userId,

          username: userData.username,
          role: userData.role,
        });
      } catch (error: any) {
        // 요청이 취소된 경우는 에러로 처리하지 않음
        if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
          console.warn('유저 정보 조회 요청이 취소되었습니다 (fetchUserInfo).');
          return;
        }
        console.error('유저 정보 조회 실패 (fetchUserInfo): ', error);
        removeAuthInfo(); // 토큰이 유효하지 않을 가능성이 있으므로 로그아웃 처리
      } finally {
        setLoading(false);
      }

    };

    fetchUserInfo();
  }, [accessToken]);

  return { accessToken, user, setAuthInfo, removeAuthInfo, loading };
};