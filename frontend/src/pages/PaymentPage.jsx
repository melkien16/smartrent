import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Wallet, AlertCircle, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { useBalance } from '../context/BalanceContext';
import { toast } from 'react-hot-toast';
import TransactionModal from '../components/TransactionModal';
import WithdrawalSuccess from '../components/WithdrawalSuccess';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { updateBookingStatus } = useBooking();
  const { balance, deductFunds, addFunds, fetchBalance } = useBalance();
  const [loading, setLoading] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [transactionError, setTransactionError] = useState('');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);

  // Get booking details from location state
  const booking = location.state?.booking;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    if (!booking) {
      navigate('/bookings');
      return;
    }

    // Fetch user's balance
    fetchBalance();
  }, [isAuthenticated, booking, navigate, fetchBalance]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Deduct amount from balance
      const success = await deductFunds(booking.totalAmount);

      if (!success) {
        throw new Error('Payment failed. Please check your balance.');
      }

      // Store payment amount and show success modal
      setPaymentAmount(booking.totalAmount);
      setShowPaymentSuccess(true);

      console.log("Payment successful:", booking);

      // Update booking status to 'confirmed'
      await updateBookingStatus(booking._id, 'confirmed');

      // Refresh balance after payment
      await fetchBalance();
    } catch (error) {
      toast.error(error.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = async (amount) => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setTransactionError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const success = await addFunds(numericAmount);
      if (!success) {
        throw new Error('Failed to deposit funds');
      }
      await fetchBalance();
      setShowDepositModal(false);
      setTransactionError('');
      toast.success('Funds added successfully!');
    } catch (err) {
      setTransactionError(err.message || 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  if (!booking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">No Booking Found</h2>
          <p className="mt-2 text-gray-600">Please select a booking to proceed with payment.</p>
          <button
            onClick={() => navigate('/bookings')}
            className="mt-4 rounded-lg bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
          >
            View Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Complete Your Payment</h1>
            <p className="mt-2 text-gray-600">Pay using your account balance</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            {/* Booking Summary */}
            <div className="mb-6">
              <h2 className="mb-4 text-lg font-semibold">Booking Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Item</span>
                  <span className="font-medium">{booking.itemTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">
                    {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-medium">${booking.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Balance Information */}
            <div className="mb-6 rounded-lg bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5 text-primary-500" />
                  <span className="font-medium">Available Balance</span>
                </div>
                <span className="text-lg font-semibold">${balance.toFixed(2)}</span>
              </div>
              {balance < booking.totalAmount && (
                <div className="mt-2 flex items-center text-sm text-red-600">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  <span>Insufficient balance. Please add funds to your account.</span>
                </div>
              )}
            </div>

            <button
              onClick={handlePayment}
              disabled={loading || balance < booking.totalAmount}
              className="mt-6 flex w-full items-center justify-center space-x-2 rounded-lg bg-primary-500 px-4 py-2 text-white hover:bg-primary-600 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Wallet className="h-5 w-5" />
                  <span>Pay ${booking.totalAmount.toFixed(2)}</span>
                </>
              )}
            </button>

            <div className="mt-4 text-center text-sm text-gray-500">
              <p>Need to add funds to your account?</p>
              <button
                onClick={() => setShowDepositModal(true)}
                className="mt-1 text-primary-500 hover:text-primary-600"
              >
                Add Funds
              </button>
            </div>
          </div>
        </div>
      </div>

      <TransactionModal
        showModal={showDepositModal}
        setShowModal={setShowDepositModal}
        transactionType="deposit"
        handleTransaction={handleDeposit}
        loading={loading}
        error={transactionError}
      />

      {showPaymentSuccess && (
        <WithdrawalSuccess
          amount={paymentAmount}
          message="Payment Successful!"
          description="Your booking has been confirmed and payment has been processed."
          onClose={() => {
            setShowPaymentSuccess(false);
            navigate('/dashboard?tab=rentals');
          }}
        />
      )}
    </div>
  );
};

export default PaymentPage; 