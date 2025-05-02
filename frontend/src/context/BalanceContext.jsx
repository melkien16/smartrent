import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { getWalletByUserId, creditWallet, debitWallet } from '../Fetchers/walletFetcher';

const BalanceContext = createContext(null);

export const useBalance = () => useContext(BalanceContext);

export const BalanceProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBalance = async () => {
    if (!user || !token) return;
    
    setLoading(true);
    try {
      const walletData = await getWalletByUserId(user.id, token);
      setBalance(walletData.balance || 0);
    } catch (err) {
      setError(err.message || 'Error fetching balance');
    } finally {
      setLoading(false);
    }
  };

  const addFunds = async (amount) => {
    if (!user) return false;
    
    setLoading(true);
    try {
      const updatedWallet = await creditWallet(amount);
      setBalance(updatedWallet.balance);
      return true;
    } catch (err) {
      setError(err.message || 'Error adding funds');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deductFunds = async (amount) => {
    if (!user) return false;
    
    setLoading(true);
    try {
      const updatedWallet = await debitWallet(amount);
      setBalance(updatedWallet.balance);
      return true;
    } catch (err) {
      setError(err.message || 'Error deducting funds');
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