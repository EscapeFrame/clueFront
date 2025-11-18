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
    setUser({
        username: '',
        userId: '',
        email: '',
        role: '',
        classCode: 0,
        grade: 0,
        classNo: 0,
        number: 0,
        description: '',
        myImage: null,
    });
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
    let isMounted = true;
    const fetchUserInfo = async () => {
      if (user.userId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const currentToken = localStorage.getItem('accessToken');
        if (!currentToken) {
          try {
            const res = await Customapi.post('/reissue', null, { withCredentials: true });
            const newToken = res.headers['authorization']?.replace('Bearer ', '') || res.data?.accessToken;
            if (newToken && isMounted) {
              localStorage.setItem('accessToken', newToken);
              setAccessToken(newToken);
            }
          } catch (reErr) {
          }
        }

        const tokenNow = localStorage.getItem('accessToken');
        if (tokenNow) {
          const res = await Customapi.get<User>('/api/user/me');
          if (isMounted) {
            const userData = res.data;
            setUser({
              userId: userData.userId || '',
              username: userData.username || '',
              email: userData.email || '',
              role: (userData.role as 'STUDENT' | 'TEACHER' | '') || '',
              classCode: userData.classCode || '',
              grade: userData.grade || 0,
              classNo: userData.classNo || 0,
              number: userData.number || 0,
              description: userData.description || '',
              myImage: userData.myImage || null,
            });
          }
        }
      } catch (error: unknown) {
        removeAuthInfo();
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchUserInfo();
    return () => {
      isMounted = false;
    };
  }, [setUser, removeAuthInfo]);

  return { accessToken, user, setAuthInfo, removeAuthInfo, loading };
};