import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../../constants/baseUrl";
import toast from "react-hot-toast";
import axios from "axios";
import { useBalance } from "../context/BalanceContext";
import { debitWallet } from "../Fetchers/walletFetcher";

const addMonths = (date, months) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
};

const addYears = (date, years) => {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d;
};

const SubscribePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { balance, fetchBalance } = useBalance();
  const [loading, setLoading] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const plan = state?.plan;
  const now = new Date();

  useEffect(() => {
    fetchBalance();
    fetchCurrentSubscription();
  }, [fetchBalance]);

  const fetchCurrentSubscription = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/subscriptions/current`);
      setCurrentSubscription(response.data);
    } catch (error) {
      console.error('Error fetching current subscription:', error);
    }
  };

  if (!plan) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">No Plan Selected</h1>
          <p className="mb-4">Please select a subscription plan first.</p>
          <button
            className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition"
            onClick={() => navigate("/plans")}
          >
            Go to Plans
          </button>
        </div>
      </div>
    );
  }

  // Check if user is trying to subscribe to the same plan
  const isSamePlan = currentSubscription?.type?.toLowerCase() === plan.name.toLowerCase();
  if (isSamePlan) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Already Subscribed</h1>
          <p className="mb-4">You are already subscribed to the {plan.name} plan.</p>
          <button
            className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Determine end date based on plan
  let endDate = now;
  if (plan.name === "Basic" || plan.period === "/month") {
    endDate = addMonths(now, 1);
  } else if (plan.period === "/year") {
    endDate = addYears(now, 1);
  }

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // Get subscription price
      const price = parseFloat(plan.price.replace('$', ''));

      // Check if user has sufficient balance
      if (balance < price) {
        toast.error('Insufficient balance. Please add funds to your account.');
        return;
      }

      // Get user ID from localStorage
      const user = JSON.parse(localStorage.getItem('smartRentUser'));
      if (!user?._id) {
        throw new Error('User not authenticated');
      }

      // Deduct amount from wallet
      const success = await debitWallet(price, user._id);
      if (!success) {
        throw new Error('Payment failed. Please try again.');
      }

      // Convert plan name to lowercase for backend validation
      const subscriptionType = plan.name.toLowerCase();

      const subscriptionData = {
        type: subscriptionType,
        startDate: now.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
      };

      // Create subscription
      await axios.post(`${BASE_URL}/subscriptions`, subscriptionData);

      // Refresh balance
      await fetchBalance();

      toast.success("Subscription successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Subscription failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Subscribe to {plan.name} Plan
        </h1>
        <div className="flex flex-col items-center mb-6">
          <div className="text-2xl font-semibold text-primary-600 mb-2">
            {plan.price}{" "}
            <span className="text-lg text-gray-500">{plan.period}</span>
          </div>
          <ul className="mb-4 text-gray-700 text-left w-full max-w-xs">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center mb-1">
                <span className="inline-block w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
          <div className="w-full max-w-xs">
            <div className="mb-2 flex justify-between">
              <span className="font-semibold">Start Date:</span>
              <span>{now.toISOString().slice(0, 10)}</span>
            </div>
            <div className="mb-4 flex justify-between items-center">
              <span className="font-semibold">End Date:</span>
              <span>{endDate.toISOString().slice(0, 10)}</span>
            </div>
            <div className="mb-4 flex justify-between items-center">
              <span className="font-semibold">Available Balance:</span>
              <span>${balance.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <button
          className={`w-full py-3 rounded-md bg-primary-500 text-white font-semibold text-lg hover:bg-primary-600 transition ${loading || balance < parseFloat(plan.price.replace('$', '')) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          onClick={handleConfirm}
          disabled={loading || balance < parseFloat(plan.price.replace('$', ''))}
        >
          {loading ? 'Processing...' : 'Confirm Subscription'}
        </button>
        {balance < parseFloat(plan.price.replace('$', '')) && (
          <p className="mt-2 text-center text-sm text-red-600">
            Insufficient balance. Please add funds to your account.
          </p>
        )}
      </div>
    </div>
  );
};

export default SubscribePage;
