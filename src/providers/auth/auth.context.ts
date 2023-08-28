import React, { createContext } from 'react';
import { initialUser, User } from '../../types/user';

type AuthContextType = {
  token: string;
  user: User;
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
  handleToken: (token: string, redirect?: string) => void;
};

const initialAuthContext = {
  token: '',
  user: initialUser,
  onLogin: () => false,
  onLogout: () => false,
  handleToken: () => false,
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const useAuth = () => React.useContext(AuthContext);
