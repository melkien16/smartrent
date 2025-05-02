import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { CreditCard, CheckCircle2, XCircle } from 'lucide-react';

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      period: 'month',
      features: [
        'Up to 5 active listings',
        'Basic support',
        'Standard visibility',
        'Basic analytics'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 19.99,
      period: 'month',
      popular: true,
      features: [
        'Unlimited listings',
        'Priority support',
        'Enhanced visibility',
        'Advanced analytics',
        'Custom branding',
        'API access'
      ]
    },
    {
      id: 'business',
      name: 'Business',
      price: 49.99,
      period: 'month',
      features: [
        'Everything in Pro',
        'Team accounts',
        'Custom integrations',
        'Dedicated support',
        'White-label options',
        'Bulk operations'
      ]
    }
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      toast.error('Please select a subscription plan');
      return;
    }

    if (paymentMethod === 'card' && !validateCardDetails()) {
      return;
    }

    setIsProcessing(true);
    try {
      // TODO: Implement actual subscription processing
      // const response = await api.post('/subscriptions', {
      //   planId: selectedPlan.id,
      //   paymentMethod,
      //   cardDetails: paymentMethod === 'card' ? cardDetails : undefined
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Subscription activated successfully!');
      // TODO: Update user's subscription status in the app state
    } catch (error) {
      toast.error('Failed to process subscription. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const validateCardDetails = () => {
    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc || !cardDetails.name) {
      toast.error('Please fill in all card details');
      return false;
    }
    return true;
  };

  return (
    <div className="space-y-8">
      {/* Current Subscription Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Subscription</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">You are currently on the <span className="font-medium">Free</span> plan</p>
            <p className="text-sm text-gray-500 mt-1">Upgrade to access premium features</p>
          </div>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-lg shadow p-6 relative ${
              selectedPlan?.id === plan.id ? 'ring-2 ring-primary-500' : ''
            } ${plan.popular ? 'border-2 border-primary-500' : ''}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary-500 text-white px-3 py-1 rounded-tl-lg rounded-br-lg text-sm font-medium">
                Popular
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
              <span className="text-gray-500">/{plan.period}</span>
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePlanSelect(plan)}
              className={`w-full py-2 px-4 rounded-md ${
                selectedPlan?.id === plan.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Method */}
      {selectedPlan && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={() => handlePaymentMethodChange('card')}
                className={`flex-1 py-2 px-4 rounded-md border ${
                  paymentMethod === 'card'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                <CreditCard className="w-5 h-5 inline-block mr-2" />
                Credit/Debit Card
              </button>
              <button
                onClick={() => handlePaymentMethodChange('paypal')}
                className={`flex-1 py-2 px-4 rounded-md border ${
                  paymentMethod === 'paypal'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                PayPal
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="number"
                    value={cardDetails.number}
                    onChange={handleCardDetailsChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      value={cardDetails.expiry}
                      onChange={handleCardDetailsChange}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      name="cvc"
                      value={cardDetails.cvc}
                      onChange={handleCardDetailsChange}
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={cardDetails.name}
                    onChange={handleCardDetailsChange}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Subscribe Button */}
      {selectedPlan && (
        <div className="flex justify-end">
          <button
            onClick={handleSubscribe}
            disabled={isProcessing}
            className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : `Subscribe to ${selectedPlan.name} Plan`}
          </button>
        </div>
      )}
    </div>
  );
};

export default Subscription; 