import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is saved in localStorage
    const savedUser = localStorage.getItem('smartRentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('smartRentUser', JSON.stringify(userData));
  };

  const register = (userData) => {
    // For a real app, this would make an API call
    // For demo purposes, we'll simulate successful registration
    const newUser = {
      ...userData,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      role: userData.email === 'admin@smartrent.com' ? 'admin' : 'user', // Default role
    };
    setUser(newUser);
    localStorage.setItem('smartRentUser', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartRentUser');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: isAdmin(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};