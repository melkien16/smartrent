import React from 'react';
import { PlusCircle, MinusCircle, Wallet } from 'lucide-react';

const WalletComponent = ({ 
  balance, 
  setTransactionType, 
  setShowTransactionModal,
  user 
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Wallet & Deposit</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Current Balance</p>
          <p className="text-2xl font-semibold">${balance.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Pending Deposits</p>
          <p className="text-2xl font-semibold">${user?.wallet?.pendingDeposits || 0}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button 
          className="flex-1 btn-primary flex items-center justify-center gap-2"
          onClick={() => {
            setTransactionType('deposit');
            setShowTransactionModal(true);
          }}
        >
          <PlusCircle className="h-5 w-5" />
          Deposit
        </button>
        <button 
          className="flex-1 btn-secondary flex items-center justify-center gap-2"
          onClick={() => {
            setTransactionType('withdraw');
            setShowTransactionModal(true);
          }}
        >
          <MinusCircle className="h-5 w-5" />
          Withdraw
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        {user?.wallet?.recentTransactions?.length > 0 ? (
          user.wallet.recentTransactions.map((transaction) => (
            <div key={transaction?.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{transaction?.type === 'deposit' ? 'Deposit' : 'Withdrawal'}</p>
                  <p className="text-sm text-gray-500">{transaction?.date || 'Unknown date'}</p>
                </div>
                <p className={`text-lg font-semibold ${
                  transaction?.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction?.type === 'deposit' ? '+' : '-'}${transaction?.amount || 0}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No recent transactions</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(WalletComponent); 