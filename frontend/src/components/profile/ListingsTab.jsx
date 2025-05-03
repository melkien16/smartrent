import React from 'react';
import ItemGrid from '../../components/items/ItemGrid';
import { Package } from 'lucide-react';

const ListingsTab = ({ userItems }) => {
  console.log('ListingsTab received items:', userItems);

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        {userItems.length > 0 ? 'My Listings' : 'Listings'}
      </h2>
      {userItems.length > 0 ? (
        <ItemGrid items={userItems} />
      ) : (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No listings found</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(ListingsTab); 