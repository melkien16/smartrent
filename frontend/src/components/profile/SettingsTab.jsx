import React from 'react';

const SettingsTab = ({ profileUser }) => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Settings</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={profileUser.email}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={profileUser.location}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Member Since</label>
            <input
              type="text"
              value={profileUser.memberSince}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(SettingsTab); 