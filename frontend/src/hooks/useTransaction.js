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
        setError('');

        try {
            if (transactionType === 'deposit') {
                const success = await addFunds(numericAmount);
                if (!success) throw new Error('Failed to deposit funds');
                toast.success('Deposit successful!');
                setShowTransactionModal(false);
            } else {
                const success = await deductFunds(numericAmount);
                if (!success) throw new Error('Failed to withdraw funds');
                setWithdrawalAmount(numericAmount);
                setShowWithdrawalSuccess(true);
                setShowTransactionModal(false);
            }

            await fetchBalance();
        } catch (err) {
            setError(err.message || 'Transaction failed');
            // Don't close the modal on error, let the user try again
        } finally {
            setTransactionLoading(false);
        }
    };

    const handleCloseWithdrawalSuccess = () => {
        setShowWithdrawalSuccess(false);
        setWithdrawalAmount(0);
    };

    const resetTransactionState = () => {
        setShowTransactionModal(false);
        setTransactionType('deposit');
        setError('');
        setTransactionLoading(false);
        setAmount('');
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
        handleCloseWithdrawalSuccess,
        resetTransactionState
    };
}; 