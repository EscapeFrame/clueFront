import { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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

// Module-level guards so multiple hook instances don't trigger duplicate fetches
let globalFetchPromise: Promise<void> | null = null;
let globalFetched = false;
// Ensure we don't spam reissue requests when the user is not logged in.
let reissueAttempted = false;
// Time-based cooldown: timestamp of last reissue attempt (ms)
let lastReissueAt: number | null = null;
const REISSUE_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

export const useAuth = (): AuthHook => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [user, setUser] = useRecoilState(userState);
  const location = useLocation();
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  // 로그인 시 토큰 저장
  const setAuthInfo = useCallback((accessToken: string) => {
    setAccessToken(accessToken);
    localStorage.setItem('accessToken', accessToken);
  // allow reissue attempts again after manual login
  reissueAttempted = false;
  lastReissueAt = null;
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
  // reset module-level flags so future hook instances can fetch again
  globalFetched = false;
  globalFetchPromise = null;
  }, [setUser]);
  

  const isMountedRef = useRef(false);
  const reissueCountRef = useRef(0);
  // module-level guard so multiple hook instances don't trigger parallel fetches
  // and so user info is fetched globally only once unless reset.
  // Note: kept at module scope across hook instances.

  useEffect(() => {
    // localStorage의 accessToken 변경을 감지하는 이벤트 리스너
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'accessToken') {
        setAccessToken(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const fetchUserInfo = async (forceFetch = false) => {
      console.log('useAuth: fetchUserInfo called. forceFetch=', forceFetch, ' currentRecoilUserId=', user?.userId);

      // If already fetched globally and no forceFetch, use existing Recoil state
      if (globalFetched && !forceFetch && user && user.userId) {
        console.log('useAuth: globalFetched and Recoil user exists, skipping fetch.');
        return;
      }

      // If another instance is currently fetching, wait for it
      if (globalFetchPromise) {
        console.log('useAuth: Another instance is fetching, awaiting globalFetchPromise');
        try {
          await globalFetchPromise;
        } catch {
          // swallow, other instance handled errors
        }
        return;
      }

      // create global fetch promise so other instances await this
      globalFetchPromise = (async () => {
        setLoading(true);
        try {
          // 액세스 토큰이 없을 경우 reissue 시도
          // check cooldown before attempting reissue
          const now = Date.now();
          const inCooldown = lastReissueAt ? now - lastReissueAt < REISSUE_COOLDOWN_MS : false;
          // do not attempt reissue on login page
          const isLoginRoute = location && typeof location.pathname === 'string' && location.pathname.startsWith('/login');
          if (!accessToken && !reissueAttempted && !inCooldown && !isLoginRoute) {
            console.log('useAuth: No accessToken in state, attempting to reissue via server.');
            try {
              const res = await Customapi.post('/reissue', null, { withCredentials: true });
              const newToken = res.headers['authorization']?.replace('Bearer ', '') || res.data?.accessToken;
              if (newToken) {
                localStorage.setItem('accessToken', newToken);
                setAccessToken(newToken);
                reissueCountRef.current += 1; // reissue 발생 표시
                console.log('useAuth: Reissued accessToken and saved to localStorage.');
              }
            } catch (reErr) {
              console.warn('useAuth: Reissue attempt failed or no refresh token present:', reErr);
            } finally {
              // mark that we've attempted reissue so we don't continuously retry when not logged in
              reissueAttempted = true;
              lastReissueAt = Date.now();
            }
          }

          const tokenNow = localStorage.getItem('accessToken');
          if (!tokenNow) {
            console.log('useAuth: Still no accessToken after reissue attempt.');
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
          globalFetched = true;
        } catch (error: unknown) {
          const err = error as { name?: string; code?: string } | undefined;
          if (err && (err.name === 'CanceledError' || err.code === 'ERR_CANCELED')) {
            console.warn('useAuth: User info fetch canceled.');
          } else {
            console.error('useAuth: Failed to fetch user info:', error);
            // Prevent infinite reload/loop: don't force logout here.
            // Instead mark reissue as attempted and set cooldown so we don't retry immediately.
            reissueAttempted = true;
            lastReissueAt = Date.now();
          }
        } finally {
          setLoading(false);
          console.log('useAuth: Setting loading to false.');
          isMountedRef.current = true; // 최초 호출 완료 표시
          // clear the promise so future fetches can start if needed
          globalFetchPromise = null;
        }
      })();

      try {
        await globalFetchPromise;
      } catch {
        // already handled in promise
      }
    };

    // reissueCountRef 가 올라갈 때만 강제 fetch
  const shouldForceFetch = reissueCountRef.current > 0 && isMountedRef.current;
  fetchUserInfo(shouldForceFetch);
    // 의존성은 accessToken이 변하더라도 자동으로 fetch를 막기 위해 최소화함
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUser, removeAuthInfo]);

  return { accessToken, user, setAuthInfo, removeAuthInfo, loading };
};