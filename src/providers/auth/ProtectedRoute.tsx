import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth.context';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { token } = useAuth();
  if (!token) {
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;
