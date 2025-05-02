import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCategories } from '../context/CategoryContext';
import SearchBar from '../components/explore/SearchBar';
import FilterTags from '../components/explore/FilterTags';
import FilterPanel from '../components/explore/FilterPanel';
import CategorySection from '../components/explore/CategorySection';
import ItemsSection from '../components/explore/ItemsSection';
import { useFilters } from '../hooks/useFilters';
import { useFilteredItems } from '../hooks/useFilteredItems';

const ExplorePage = () => {
  const [searchParams] = useSearchParams();
  const { categories, getCategoryById } = useCategories();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const { filters, updateFilters, resetFilters, filtersApplied } = useFilters(searchParams);
  const items = useFilteredItems(filters);

  const toggleFilters = () => setIsFilterOpen(!isFilterOpen);

  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search') || '';

  return (
    <div className="min-h-screen bg-gray-50 pb-12 pt-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {categoryParam
              ? `${getCategoryById(categoryParam)?.name || 'Category'} Rentals`
              : searchQuery
                ? `Search Results: "${searchQuery}"`
                : 'Explore All Items'}
          </h1>
          <p className="mt-2 text-gray-600">
            {items.length} {items.length === 1 ? 'item' : 'items'} available
          </p>
        </div>

        {/* Search and Filters */}
        <SearchBar
          searchInput={filters.search}
          setSearchInput={(value) => updateFilters({ search: value })}
          onSearch={updateFilters}
          toggleFilters={toggleFilters}
        />

        {/* Filter Tags */}
        <FilterTags
          filters={filters}
          getCategoryById={getCategoryById}
          updateFilters={updateFilters}
          resetFilters={resetFilters}
          filtersApplied={filtersApplied}
        />

        {/* Filter Panel */}
        <FilterPanel
          isOpen={isFilterOpen}
          filters={filters}
          categories={categories}
          updateFilters={updateFilters}
          resetFilters={resetFilters}
          toggleFilters={toggleFilters}
        />

        {/* Category List */}
        <CategorySection show={!categoryParam && !searchQuery} />

        {/* Items Grid */}
        <ItemsSection items={items} />
      </div>
    </div>
  );
};

export default ExplorePage;