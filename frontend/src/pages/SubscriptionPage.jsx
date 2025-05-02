import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SubscriptionPlans from '../components/subscription/SubscriptionPlans';

const SubscriptionPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Subscription Plans</h1>
          <p className="mt-2 text-gray-600">
            Choose the plan that best fits your needs and unlock premium features
          </p>
        </div>
        <SubscriptionPlans />
      </div>
    </div>
  );
};

export default SubscriptionPage; 