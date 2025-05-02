import React from 'react';
import { Package } from 'lucide-react';

const Rentals = ({ userRentedItems, setActiveTab }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Rentals</h2>
      {userRentedItems.length === 0 ? (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">You don't have any active rentals yet.</p>
          <button 
            onClick={() => setActiveTab('overview')}
            className="mt-4 text-primary-600 hover:text-primary-700"
          >
            Browse available items
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userRentedItems.map((rental) => (
                <tr key={rental?.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        className="h-10 w-10 rounded-full" 
                        src={rental?.item?.images?.[0] || '/placeholder.png'} 
                        alt={rental?.item?.title || 'Item'} 
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{rental?.item?.title || 'Unknown Item'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{rental?.item?.owner?.name || 'Unknown Owner'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      rental?.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {rental?.status || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {rental?.returnDate || 'Not specified'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default React.memo(Rentals); 