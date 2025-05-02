import React from 'react';

const FilterPanel = ({ isOpen, filters, categories, updateFilters, resetFilters, toggleFilters }) => {
  if (!isOpen) return null;

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          className="text-sm text-gray-500 hover:text-gray-700"
          onClick={resetFilters}
        >
          Reset all
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Category Filter */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            className="input"
            value={filters.category}
            onChange={(e) => updateFilters({ category: e.target.value })}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Price Range
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              className="input"
              min="0"
              value={filters.minPrice}
              onChange={(e) => updateFilters({ minPrice: e.target.value })}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              className="input"
              min="0"
              value={filters.maxPrice}
              onChange={(e) => updateFilters({ maxPrice: e.target.value })}
            />
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Sort By
          </label>
          <select
            className="input"
            value={filters.sort}
            onChange={(e) => updateFilters({ sort: e.target.value })}
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-3">
        <button className="btn-outline" onClick={toggleFilters}>
          Cancel
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            updateFilters(filters);
            toggleFilters();
          }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default React.memo(FilterPanel); 