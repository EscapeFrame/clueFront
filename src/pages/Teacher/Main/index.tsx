import { createContext, useContext, ReactNode, Dispatch, SetStateAction, useState, useMemo } from 'react';
import { USERJwtRequest } from '@/entities/User/model/user.atom';

// Context 타입 정의
export interface UserContextType {
  grade: string;
  user: USERJwtRequest | null;
  setUser: Dispatch<SetStateAction<USERJwtRequest | null>>;
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
}

// Context 생성
export const UserContext = createContext<UserContextType | undefined>(undefined);

// JWT 토큰에서 grade 파싱하는 함수
const parseGradeFromToken = (token: string | null): string => {
  if (!token) return 'guest';
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // JWT 디코딩
    return payload.grade || payload.role || 'user';
  } catch {
    return 'guest';
  }
};

// Provider 컴포넌트
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<USERJwtRequest | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const grade = useMemo(() => {
    return parseGradeFromToken(accessToken);
  }, [accessToken]);

  return (
    <UserContext.Provider 
      value={{ 
        grade,
        user, 
        setUser, 
        accessToken, 
        setAccessToken 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Context 사용 훅
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};