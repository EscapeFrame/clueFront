import { createContext } from 'react';

export interface User {
  userId: string;
  username: string;
  role: string;
  myImage?: string | null;
}

export interface UserContextType {
  accessToken: string | null;
  user: User | null;
  setAuthInfo: (token: string, userInfo: User) => void;
  removeAuthInfo: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
