import React from 'react';
import { useAuth } from '../providers/auth/auth.context';

const Login = () => {
  const { onLogin } = useAuth();

  return (
    <>
      <h1>Login Page</h1>
      <div>
        <button
          type="button"
          onClick={() => onLogin('fake email', 'fake pass')}
        >
          Sign In
        </button>
      </div>
    </>
  );
};
export default Login;
