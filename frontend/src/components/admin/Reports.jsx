import React from 'react';

const Reports = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reports & Disputes</h2>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <select className="select">
            <option>All Types</option>
            <option>Item Issues</option>
            <option>User Complaints</option>
            <option>Payment Disputes</option>
          </select>
          <select className="select">
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reporter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Placeholder for report data */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#RPT-1234</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Item Issue</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Damaged Item</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    In Progress
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 1, 2024</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                  <button className="text-green-600 hover:text-green-900">Resolve</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Reports); 