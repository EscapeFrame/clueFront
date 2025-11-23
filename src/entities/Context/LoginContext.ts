import { createContext } from 'react';

export interface User {
  userId: string;
  username: string;
  role: string;
  myImage?: string | null; // Assuming 'image' maps to 'myImage'
  email?: string;
  description?: string;
  grade?: number;
  classNo?: number;
  number?: number;
  createdAt?: string;
}

export interface UserContextType {
  accessToken: string | null;
  user: User | null;
  setAuthInfo: (accessToken: string) => void;
  removeAuthInfo: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
