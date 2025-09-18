import { createContext } from 'react';

export interface User {
  userId: string;
  username: string;
  role: string;
  myImage?: string | null;
}

export interface UserContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  setAuthInfo: (accessToken: string, refreshToken: string) => void;
  removeAuthInfo: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
