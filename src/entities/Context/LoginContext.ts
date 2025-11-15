import { createContext } from 'react';

export interface User {
  userId: string;
  username: string;
  role: string;
  myImage?: string | null;
  classCode?: number | string;
}

export interface UserContextType {
  accessToken: string | null;
  user: User | null;
  setAuthInfo: (accessToken: string) => void;
  removeAuthInfo: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
