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
    setUser({ username: "", userId: "", role: "", classCode: 0 });
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
      console.log('useAuth: useEffect/fetchUserInfo triggered.');
      const token = localStorage.getItem('accessToken');
      console.log('useAuth: accessToken from localStorage:', token);

      if (!accessToken) {
        console.log('useAuth: No accessToken, setting loading to false.');
        setLoading(false);
        return;
      }

      console.log('useAuth: AccessToken exists, fetching user info...');
      setLoading(true); // 명시적으로 로딩 시작을 알림

      try {
        const res = await Customapi.get<{ userId: string; username: string; role: "STUDENT" | "TEACHER", classCode: string | number }>('/api/user/me');
        const userData = res.data;
        console.log('useAuth: User info fetched successfully:', userData);
        setUser({
          userId: userData.userId,
          username: userData.username,
          role: userData.role,
          classCode: userData.classCode,
        });
      } catch (error: any) {
        if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
          console.warn('useAuth: User info fetch canceled.');
        } else {
          console.error('useAuth: Failed to fetch user info:', error);
          removeAuthInfo();
        }
      } finally {
        setLoading(false);
        console.log('useAuth: Setting loading to false.');
      }
    };

    fetchUserInfo();
  }, [accessToken, setUser, removeAuthInfo]);

  return { accessToken, user, setAuthInfo, removeAuthInfo, loading };
};