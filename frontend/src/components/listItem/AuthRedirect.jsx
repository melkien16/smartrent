import React from 'react';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthRedirect = React.memo(() => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary-100 text-primary-600">
          <Info size={40} />
        </div>
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Login Required</h1>
        <p className="mb-6 text-gray-600">
          You need to be logged in to list an item for rent.
        </p>
        <button 
          onClick={() => navigate('/auth')}
          className="btn-primary px-6 py-3"
        >
          Login or Sign Up
        </button>
      </div>
    </div>
  );
});

export default AuthRedirect; 