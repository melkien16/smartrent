import React from 'react';

const Listings = ({ userListedItems }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userListedItems.map((listing) => (
          <div key={listing.id} className="bg-white rounded-lg shadow p-4">
            <img src={listing.images[0]} alt={listing.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-lg font-semibold">{listing.title}</h3>
            <p className="text-gray-600">${listing.price}/{listing.priceUnit}</p>
            <span className={`mt-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${
              listing.isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {listing.isAvailable ? 'Active' : 'Rented'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Listings); 