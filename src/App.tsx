import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Layout from './components/Layout';
import NotFound from './routes/NotFound';
import Dashboard from './routes/Dashboard';
import Navigation from './components/Navigation';
import AuthProvider from './providers/auth/AuthProvider';
import ProtectedRoute from './providers/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Navigation />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={'home'} element={<Home />} />
          <Route path={'login'} element={<Login />} />
          <Route
            path={'dashboard'}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path={'*'} element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
