import { createContext, useContext, useState, ReactNode } from 'react';
import { USERJwtRequest } from '@/shared/types/user';

interface UserContextType {
  user: USERJwtRequest | null;
  setUser: (user: USERJwtRequest | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<USERJwtRequest | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};