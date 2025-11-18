import { useEffect, useState, useCallback, useRef } from 'react';
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
  const justLoggedInRef = useRef(false);

  // 로그인 시 토큰 저장
  const setAuthInfo = useCallback((accessToken: string) => {
    setAccessToken(accessToken);
    localStorage.setItem('accessToken', accessToken);
    // mark that we just logged in to avoid immediate logout race
    justLoggedInRef.current = true;
    // give it a short grace period for other effects to settle
    setTimeout(() => {
      justLoggedInRef.current = false;
    }, 1500);
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
      if (user.userId || !isMounted) return;

      setLoading(true);
      try {
        let currentToken = localStorage.getItem('accessToken');
        if (!currentToken) {
          try {
            const res = await Customapi.post('/reissue', null, { withCredentials: true });
            const newToken = res.headers['authorization']?.replace('Bearer ', '') || res.data?.accessToken;
            if (newToken && isMounted) {
              localStorage.setItem('accessToken', newToken);
              currentToken = newToken; // Update currentToken for the next step
              setAccessToken(newToken);
            }
          } catch (reissueError) {
            // Reissue failed, no need to proceed
            throw reissueError;
          }
        }

        // 이제 accessToken이 있으면 사용자 정보 요청
        const tokenNow = localStorage.getItem('accessToken');
        if (!tokenNow) {
          console.log('useAuth: Still no accessToken after reissue attempt.');
          setLoading(false);
          return;
        }

        console.log('useAuth: AccessToken exists, fetching user info...');

        const res = await Customapi.get<User>('/api/user/me');
        const userData = res.data;
        console.log('useAuth: User info fetched successfully:', userData);
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
      } catch (error: unknown) {
        const err = error as { response?: { status?: number }; name?: string; code?: string } | undefined;
        if (err && (err.name === 'CanceledError' || err.code === 'ERR_CANCELED')) {
          console.warn('useAuth: User info fetch canceled.');
        } else if (err && err.response && err.response.status === 401) {
          console.warn('useAuth: 401 when fetching user, attempting single reissue then retrying...');
          try {
            const res = await Customapi.post('/reissue', null, { withCredentials: true });
            const newToken = res.headers['authorization']?.replace('Bearer ', '') || res.data?.accessToken;
            if (newToken) {
              localStorage.setItem('accessToken', newToken);
              setAccessToken(newToken);
              // retry once
              const retryRes = await Customapi.get<User>('/api/user/me');
              const retryData = retryRes.data;
              setUser({
                userId: retryData.userId || '',
                username: retryData.username || '',
                email: retryData.email || '',
                role: (retryData.role as 'STUDENT' | 'TEACHER' | '') || '',
                classCode: retryData.classCode || '',
                grade: retryData.grade || 0,
                classNo: retryData.classNo || 0,
                number: retryData.number || 0,
                description: retryData.description || '',
                myImage: retryData.myImage || null,
              });
            } else {
              // if reissue didn't return token, fall through to logout handling below
              if (!justLoggedInRef.current) removeAuthInfo();
            }
          } catch (reErr) {
            console.error('useAuth: Reissue on 401 failed:', reErr);
            if (!justLoggedInRef.current) removeAuthInfo();
          }
        } else {
          console.error('useAuth: Failed to fetch user info:', error);
          if (!justLoggedInRef.current) removeAuthInfo();
        }
      } catch (error) {
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
  }, [user.userId, setUser, removeAuthInfo]);

  return { accessToken, user, setAuthInfo, removeAuthInfo, loading };
};