import React from 'react';

const Settings = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Platform Settings</h2>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform Name
              </label>
              <input
                type="text"
                defaultValue="SmartRent"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform Description
              </label>
              <textarea
                defaultValue="A smart rental platform connecting owners and renters"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Support Email
              </label>
              <input
                type="email"
                defaultValue="support@smartrent.com"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Payment Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Commission Rate (%)
              </label>
              <input
                type="number"
                defaultValue="10"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Rental Duration (days)
              </label>
              <input
                type="number"
                defaultValue="1"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="auto-approve"
                defaultChecked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="auto-approve" className="ml-2 block text-sm text-gray-700">
                Auto-approve new listings
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Security Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                defaultValue="30"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="2fa"
                defaultChecked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="2fa" className="ml-2 block text-sm text-gray-700">
                Require 2FA for admin access
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="email-verification"
                defaultChecked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="email-verification" className="ml-2 block text-sm text-gray-700">
                Require email verification for new users
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Settings); 