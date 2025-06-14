import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { getWalletByUserId, creditWallet, debitWallet, createWallet, getUserTransactions } from '../Fetchers/walletFetcher';

const BalanceContext = createContext(null);

export const useBalance = () => useContext(BalanceContext);

export const BalanceProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const fetchBalance = useCallback(async () => {
    if (!user?._id) return;

    setLoading(true);
    try {
      try {
        const walletData = await getWalletByUserId(user._id);
        setBalance(walletData.balance || 0);
      } catch (err) {
        if (err.message === "Wallet not found") {
          // Create a new wallet if it doesn't exist
          const newWallet = await createWallet();
          setBalance(newWallet.balance || 0);
        } else {
          throw err;
        }
      }
    } catch (err) {
      setError(err.message || 'Error fetching balance');
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  const fetchTransactions = useCallback(async () => {
    if (!user?._id) return;

    try {
      const transactions = await getUserTransactions(user._id);
      setTransactions(transactions || []);
    } catch (err) {
      setError(err.message || 'Error fetching transactions');
    }
  }, [user?._id]);

  const addFunds = async (amount) => {
    if (!user?._id) return false;

    setLoading(true);
    try {
      try {
        const updatedWallet = await creditWallet(amount, user._id);
        setBalance(updatedWallet.balance);
        await fetchTransactions();
        return true;
      } catch (err) {
        if (err.message === "Wallet not found") {
          // Create a new wallet if it doesn't exist
          const newWallet = await createWallet();
          // Try crediting again
          const updatedWallet = await creditWallet(amount, user._id);
          setBalance(updatedWallet.balance);
          await fetchTransactions();
          return true;
        } else {
          throw err;
        }
      }
    } catch (err) {
      setError(err.message || 'Error adding funds');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deductFunds = async (amount) => {
    if (!user?._id) return false;

    setLoading(true);
    try {
      const updatedWallet = await debitWallet(amount, user._id);
      setBalance(updatedWallet.balance);
      await fetchTransactions();
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
    transactions,
    fetchBalance,
    addFunds,
    deductFunds,
    fetchTransactions
  };

  return <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>;
}; 