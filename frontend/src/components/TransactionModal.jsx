import React, { useState } from "react";
import { X } from "lucide-react";

const TransactionModal = ({
  showModal,
  setShowModal,
  transactionType,
  handleTransaction,
  loading,
  error,
  resetTransactionState
}) => {
  const [amount, setAmount] = useState("");

  const handleClose = () => {
    if (!loading) {
      resetTransactionState();
    }
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              {transactionType === "deposit"
                ? "Deposit Funds"
                : "Withdraw Funds"}
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                min="0"
                step="0.01"
                disabled={loading}
              />
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={handleClose}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={() => handleTransaction(amount)}
              className="btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : transactionType === "deposit" ? (
                "Deposit"
              ) : (
                "Withdraw"
              )}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default TransactionModal;
