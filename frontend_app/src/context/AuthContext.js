import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../services/api';

// PUBLIC_INTERFACE
export const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access auth context */
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides authentication state and methods to the app */
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Attempt to load current user on mount if token exists
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setInitializing(false);
      return;
    }
    getCurrentUser()
      .then((u) => setUser(u))
      .catch(() => {
        localStorage.removeItem('auth_token');
        setUser(null);
      })
      .finally(() => setInitializing(false));
  }, []);

  const handleLogin = async (email, password) => {
    const data = await loginUser({ email, password });
    if (data?.token) {
      localStorage.setItem('auth_token', data.token);
    }
    setUser(data.user || null);
    return data;
  };

  const handleRegister = async (name, email, password) => {
    const data = await registerUser({ name, email, password });
    // Some backends auto-login post register; if token returned, store it
    if (data?.token) {
      localStorage.setItem('auth_token', data.token);
    }
    if (data?.user) setUser(data.user);
    return data;
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      // ignore network errors here
    }
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const value = {
    user,
    initializing,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
