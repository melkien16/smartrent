import React from 'react';
import { Shield } from 'lucide-react';

const VerificationBadges = ({ profileUser }) => {
  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Verification</h2>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center rounded-md bg-green-50 px-3 py-2 text-green-700">
          <Shield size={16} className="mr-2" />
          <span className="text-sm">Email Verified</span>
        </div>
        <div className="flex items-center rounded-md bg-green-50 px-3 py-2 text-green-700">
          <Shield size={16} className="mr-2" />
          <span className="text-sm">Phone Verified</span>
        </div>
        <div className="flex items-center rounded-md bg-gray-100 px-3 py-2 text-gray-500">
          <Shield size={16} className="mr-2" />
          <span className="text-sm">ID Not Verified</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(VerificationBadges); 