import React from 'react';

const Subscriptions = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Subscription Management</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <select className="select">
            <option>All Plans</option>
            <option>Basic</option>
            <option>Premium</option>
          </select>
          <button className="btn bg-primary-600 text-white">Add Plan</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Basic Plan */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Basic Plan</h3>
            <p className="text-3xl font-bold mb-4">$9.99<span className="text-sm font-normal text-gray-500">/month</span></p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Up to 5 listings</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Basic support</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Standard analytics</span>
              </li>
            </ul>
            <div className="flex justify-between">
              <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
              <button className="text-red-600 hover:text-red-900">Delete</button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-lg shadow p-6 border-2 border-primary-500">
            <h3 className="text-lg font-semibold mb-2">Premium Plan</h3>
            <p className="text-3xl font-bold mb-4">$19.99<span className="text-sm font-normal text-gray-500">/month</span></p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Unlimited listings</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Priority support</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Custom branding</span>
              </li>
            </ul>
            <div className="flex justify-between">
              <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
              <button className="text-red-600 hover:text-red-900">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Subscriptions); 