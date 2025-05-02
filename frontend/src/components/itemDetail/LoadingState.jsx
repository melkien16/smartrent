import React from 'react';

const LoadingState = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-primary-200"></div>
        <p className="mt-4 text-gray-600">Loading item details...</p>
      </div>
    </div>
  );
};

export default React.memo(LoadingState); 