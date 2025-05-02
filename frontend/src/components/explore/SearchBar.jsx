import React from 'react';
import { Search, Filter, Sliders } from 'lucide-react';

const SearchBar = ({ searchInput, setSearchInput, onSearch, toggleFilters }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ search: searchInput });
  };

  return (
    <>
      {/* Desktop */}
      <div className="mb-6 hidden md:block">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for items..."
              className="input pl-10"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary">
            Search
          </button>
          <button
            type="button"
            className="btn-outline flex items-center space-x-2"
            onClick={toggleFilters}
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </form>
      </div>

      {/* Mobile */}
      <div className="mb-4 md:hidden">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for items..."
              className="input pl-10"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white p-2 text-gray-700"
            onClick={toggleFilters}
          >
            <Sliders size={20} />
          </button>
        </form>
      </div>
    </>
  );
};

export default React.memo(SearchBar); 