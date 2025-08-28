import { createContext, Dispatch, SetStateAction } from 'react';
import { USERJwtRequest } from '@/entities/User/model/user.atom';

export interface UserContextType {
  user: USERJwtRequest | null;
  setUser: Dispatch<SetStateAction<USERJwtRequest | null>>;
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);