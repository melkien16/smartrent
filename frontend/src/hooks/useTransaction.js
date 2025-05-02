import { useState } from 'react';
import { useBalance } from '../context/BalanceContext';
import { toast } from 'react-hot-toast';

export const useTransaction = () => {
    const { balance, addFunds, deductFunds, fetchBalance } = useBalance();
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [transactionType, setTransactionType] = useState('deposit');
    const [error, setError] = useState('');
    const [transactionLoading, setTransactionLoading] = useState(false);
    const [showWithdrawalSuccess, setShowWithdrawalSuccess] = useState(false);
    const [withdrawalAmount, setWithdrawalAmount] = useState(0);

    const handleTransaction = async (amount) => {
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        if (transactionType === 'withdraw' && numericAmount > balance) {
            setError('Insufficient balance');
            return;
        }

        setTransactionLoading(true);
        try {
            if (transactionType === 'deposit') {
                const success = await addFunds(numericAmount);
                if (!success) throw new Error('Failed to deposit funds');
                toast.success('Deposit successful!');
            } else {
                const success = await deductFunds(numericAmount);
                if (!success) throw new Error('Failed to withdraw funds');
                setWithdrawalAmount(numericAmount);
                setShowWithdrawalSuccess(true);
            }

            await fetchBalance();
            setShowTransactionModal(false);
            setError('');
        } catch (err) {
            setError(err.message || 'Transaction failed');
        } finally {
            setTransactionLoading(false);
        }
    };

    return {
        showTransactionModal,
        setShowTransactionModal,
        transactionType,
        setTransactionType,
        handleTransaction,
        transactionLoading,
        error,
        showWithdrawalSuccess,
        withdrawalAmount,
    };
}; 