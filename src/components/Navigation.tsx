import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../providers/auth/auth.context';

const Navigation = () => {
  const { onLogout, token, user } = useAuth();

  return (
    <nav>
      <Link to={'/home'}>Home</Link> | <Link to={'/dashboard'}>Dashboard</Link>
      {token && (
        <>
          <br />
          {user.email}{' '}
          <button type="button" onClick={() => onLogout()}>
            Sign Out
          </button>
        </>
      )}
    </nav>
  );
};
export default Navigation;
