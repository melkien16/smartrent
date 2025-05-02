import React from 'react';

const Bookings = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Booking Management</h2>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <select className="select">
            <option>All Status</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Returned</option>
            <option>Late</option>
          </select>
          <button className="btn">Export</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Renter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Placeholder for booking data */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#BK-1234</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Camera Equipment</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Jan 1 - Jan 5, 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$150.00</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Confirmed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                  <button className="text-red-600 hover:text-red-900">Cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Bookings); 