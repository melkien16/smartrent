import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const NotFoundState = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 text-red-500">
          <AlertCircle size={40} />
        </div>
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Item Not Found</h1>
        <p className="mb-6 text-gray-600">
          Sorry, we couldn't find the item you're looking for. It may have been removed or doesn't exist.
        </p>
        <Link to="/explore" className="btn-primary">
          Browse Other Items
        </Link>
      </div>
    </div>
  );
};

export default React.memo(NotFoundState); 