import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './auth.context';
import { initialUser, User } from '../../types/user';

export const localStorageTokenKey = 'react-token';
const decodedUser: User = { id: 1, email: 'test@test.net' }; // testing only

const fakeAuth = (): Promise<string> =>
  new Promise((resolve) => {
    setTimeout(() => resolve('2342f2f1d131rf12'), 250);
  });

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<User>(initialUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem(localStorageTokenKey);
    if (token) {
      const current = Math.ceil(new Date().getTime() / 1000);
      const exp = current + 3600; // testing only
      if (exp > current) {
        setToken(token);
        setUser(decodedUser);
        const origin = `${location.pathname}${location.search}` || '/';
        navigate(origin, { replace: true });
      } else {
        handleLogout();
      }
    } else {
      handleLogout();
    }
  }, [navigate, location.pathname, location.search]);

  const handleLogin = async (email: string, password: string) => {
    fakeAuth().then((data) => {
      handleToken(data);
    });
  };

  const handleToken = (token: string, redirect?: string) => {
    setToken(token);
    setUser(decodedUser);
    localStorage.setItem(localStorageTokenKey, token);
    const origin = redirect ? redirect : location.state?.from?.pathname || '/';
    navigate(origin);
  };

  const handleLogout = () => {
    setToken('');
    setUser(initialUser);
    localStorage.removeItem(localStorageTokenKey);
  };

  const value = {
    token,
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
    handleToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
