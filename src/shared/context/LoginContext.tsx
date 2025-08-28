import { createContext } from 'react';
import { USERJwtRequest } from '@/shared/types/user';

interface UserContextType {
  user: USERJwtRequest | null;
  setUser: (user: USERJwtRequest | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  accessToken: null,
  setAccessToken: () => {}
});