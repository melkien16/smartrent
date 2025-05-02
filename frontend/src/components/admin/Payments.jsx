import React from 'react';

const Payments = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Payments & Commissions</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium">Total Revenue</h3>
            <p className="text-2xl font-bold">$24,500</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium">Platform Commission</h3>
            <p className="text-2xl font-bold">$2,450</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium">Pending Disputes</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Placeholder for transaction data */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#TRX-1234</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$150.00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$15.00</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 1, 2024</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Payments); 