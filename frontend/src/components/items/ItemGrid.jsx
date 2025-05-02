import React from 'react';
import ItemCard from './ItemCard';

const ItemGrid = ({ items, title, subtitle }) => {
  return (
    <div>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold text-gray-900">{title}</h2>}
          {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
          <p className="mb-2 text-lg font-medium text-gray-900">No items found</p>
          <p className="text-gray-500">Try changing your search criteria or check back later</p>
        </div>
      )}
    </div>
  );
};

export default ItemGrid;