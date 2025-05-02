import React from 'react';
import { X } from 'lucide-react';

const FilterTags = ({ filters, getCategoryById, updateFilters, resetFilters, filtersApplied }) => {
  if (!filtersApplied) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Filters:</span>
      
      {filters.category && (
        <div className="flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700">
          <span>{getCategoryById(filters.category)?.name}</span>
          <button
            className="ml-1 text-primary-500 hover:text-primary-700"
            onClick={() => updateFilters({ category: '' })}
          >
            <X size={14} />
          </button>
        </div>
      )}
      
      {filters.minPrice && (
        <div className="flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700">
          <span>Min: ${filters.minPrice}</span>
          <button
            className="ml-1 text-primary-500 hover:text-primary-700"
            onClick={() => updateFilters({ minPrice: '' })}
          >
            <X size={14} />
          </button>
        </div>
      )}
      
      {filters.maxPrice && (
        <div className="flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700">
          <span>Max: ${filters.maxPrice}</span>
          <button
            className="ml-1 text-primary-500 hover:text-primary-700"
            onClick={() => updateFilters({ maxPrice: '' })}
          >
            <X size={14} />
          </button>
        </div>
      )}
      
      {filters.sort !== 'recommended' && (
        <div className="flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700">
          <span>
            {filters.sort === 'price-low'
              ? 'Price: Low to High'
              : filters.sort === 'price-high'
                ? 'Price: High to Low'
                : filters.sort === 'newest'
                  ? 'Newest'
                  : 'Highest Rated'}
          </span>
          <button
            className="ml-1 text-primary-500 hover:text-primary-700"
            onClick={() => updateFilters({ sort: 'recommended' })}
          >
            <X size={14} />
          </button>
        </div>
      )}
      
      <button
        className="ml-2 text-sm text-primary-600 hover:text-primary-700"
        onClick={resetFilters}
      >
        Clear all
      </button>
    </div>
  );
};

export default React.memo(FilterTags); 