import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // simple persistence
  useEffect(() => {
    const raw = localStorage.getItem('auth:user');
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
  }, []);
  useEffect(() => {
    if (user) localStorage.setItem('auth:user', JSON.stringify(user));
    else localStorage.removeItem('auth:user');
  }, [user]);

  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    /** Fake login for now; integrate backend later. */
    if (!email || !password) throw new Error('Missing credentials');
    setUser({ id: 'u1', email });
    return { id: 'u1', email };
  };

  // PUBLIC_INTERFACE
  const register = async (email, password) => {
    /** Fake register for now; integrate backend later. */
    if (!email || !password) throw new Error('Missing fields');
    setUser({ id: 'u1', email });
    return { id: 'u1', email };
  };

  // PUBLIC_INTERFACE
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// PUBLIC_INTERFACE
export const useAuth = () => {
  /** Access auth state and actions. */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
