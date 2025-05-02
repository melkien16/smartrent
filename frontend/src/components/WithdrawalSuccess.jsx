import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';

const WithdrawalSuccess = ({ 
  amount, 
  message = "Withdrawal Successful!", 
  description = "has been withdrawn from your account." 
}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">{message}</h3>
          <p className="text-gray-600 mb-4">
            ${amount.toFixed(2)} {description}
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary flex items-center justify-center gap-2 mx-auto"
          >
            <Home className="h-5 w-5" />
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalSuccess; 