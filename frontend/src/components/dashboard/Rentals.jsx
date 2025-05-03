import React from 'react';
import RentalList from '../rentals/RentalList';

const Rentals = ({ setActiveTab }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Rentals</h2>
      <RentalList
        variant="table"
        onBrowseItems={() => setActiveTab('overview')}
      />
    </div>
  );
};

export default React.memo(Rentals); 