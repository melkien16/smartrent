import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuccessMessage = React.memo(() => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in rounded-lg bg-white p-8 text-center shadow-sm">
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600">
        <Check size={40} />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">Item Listed Successfully!</h2>
      <p className="mb-6 text-gray-600">
        Your item has been listed and is now visible to potential renters.
      </p>
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
        <button
          onClick={() => navigate('/profile/me')}
          className="btn-primary"
        >
          View My Listings
        </button>
        <button
          onClick={() => navigate('/')}
          className="btn-outline"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
});

export default SuccessMessage; 