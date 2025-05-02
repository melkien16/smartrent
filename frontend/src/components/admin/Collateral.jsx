import React from 'react';

const Collateral = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Collateral Approvals</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <select className="select">
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pending Approval Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">ID Verification</p>
                </div>
              </div>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                Pending
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Submitted:</span>
                <span className="text-gray-900">Jan 1, 2024</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Type:</span>
                <span className="text-gray-900">Government ID</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status:</span>
                <span className="text-gray-900">Under Review</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="btn bg-red-600 text-white">Reject</button>
              <button className="btn bg-green-600 text-white">Approve</button>
            </div>
          </div>

          {/* Approved Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Jane Smith</p>
                  <p className="text-xs text-gray-500">Bank Account</p>
                </div>
              </div>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Approved
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Submitted:</span>
                <span className="text-gray-900">Dec 28, 2023</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Type:</span>
                <span className="text-gray-900">Bank Statement</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status:</span>
                <span className="text-gray-900">Verified</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Collateral); 