import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser } from '../Fetchers/userLoginFetcher';
import { registerUser } from '../Fetchers/userRegisterFetcher';

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

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      console.log('Login response:', response);
      console.log('isAdmin value:', response.isAdmin);
      console.log('isAdmin type:', typeof response.isAdmin);
      // Save the user data from the API response
      setUser(response);
      localStorage.setItem('smartRentUser', JSON.stringify(response));
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      setUser(response);
      localStorage.setItem('smartRentUser', JSON.stringify(response));
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartRentUser');
  };

  const isAdmin = () => {
    console.log('Current user:', user);
    console.log('isAdmin check:', user?.isAdmin);
    console.log('isAdmin type:', typeof user?.isAdmin);
    return user?.isAdmin === true || user?.isAdmin === 'true';
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