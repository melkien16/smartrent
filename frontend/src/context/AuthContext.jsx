import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockUsers } from '../data/mockUsers';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is saved in localStorage
    const savedUser = localStorage.getItem('smartRentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('smartRentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Find user in mockUsers
    const userKey = Object.keys(mockUsers).find(
      key => mockUsers[key].email === email && mockUsers[key].password === password
    );

    if (userKey) {
      const user = mockUsers[userKey];
      // Remove password from user object before saving
      const { password, ...userWithoutPassword } = user;
      const userToSave = {
        ...userWithoutPassword,
        id: userKey // Ensure we have the correct ID
      };
      setUser(userToSave);
      localStorage.setItem('smartRentUser', JSON.stringify(userToSave));
      return userToSave;
    }
    throw new Error('Invalid credentials');
  };

  const register = (userData) => {
    // For a real app, this would make an API call
    // For demo purposes, we'll simulate successful registration
    const newUser = {
      ...userData,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      role: 'user', // Default role
      isPremium: false,
      rating: 0,
      wallet: {
        balance: 0,
        transactions: []
      }
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