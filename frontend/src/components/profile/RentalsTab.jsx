import React from 'react';
import RentalList from '../rentals/RentalList';

const RentalsTab = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-gray-900">My Rentals</h2>
      <RentalList variant="card" />
    </div>
  );
};

export default React.memo(RentalsTab); 