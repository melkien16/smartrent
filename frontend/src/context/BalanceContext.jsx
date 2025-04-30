import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const BalanceContext = createContext(null);

export const useBalance = () => useContext(BalanceContext);

export const BalanceProvider = ({ children }) => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // In a real app, this would fetch the balance from an API
  const fetchBalance = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Dummy data - in a real app, this would come from the backend
      const dummyBalances = {
        'user-1': 500.00,
        'user-2': 1000.00,
        'user-3': 250.00,
        'user-4': 750.00,
        'user-5': 1500.00,
      };
      
      setBalance(dummyBalances[user.id] || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add funds to balance
  const addFunds = async (amount) => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would update the balance in the backend
      setBalance(prev => prev + amount);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Deduct funds from balance
  const deductFunds = async (amount) => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (balance < amount) {
        throw new Error('Insufficient balance');
      }
      
      // In a real app, this would update the balance in the backend
      setBalance(prev => prev - amount);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    balance,
    loading,
    error,
    fetchBalance,
    addFunds,
    deductFunds
  };

  return <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>;
}; 