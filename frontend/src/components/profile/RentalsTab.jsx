import React from 'react';
import { Package } from 'lucide-react';

const RentalsTab = ({ userRentals }) => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-gray-900">My Rentals</h2>
      {userRentals.length > 0 ? (
        <div className="space-y-4">
          {userRentals.map(rental => (
            <div key={rental.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <img 
                  src={rental.item.image} 
                  alt={rental.item.title}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-medium">{rental.item.title}</h3>
                  <p className="text-sm text-gray-500">
                    From {rental.startDate} to {rental.endDate}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total: ${rental.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No active rentals</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(RentalsTab); 