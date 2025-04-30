import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Sliders, Search, X } from 'lucide-react';
import CategoryList from '../components/items/CategoryList';
import ItemGrid from '../components/items/ItemGrid';
import { featuredItems, recentItems } from '../data/mockData';
import { useCategories } from '../context/CategoryContext';

const ExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, getCategoryById } = useCategories();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);

  // Get filter values from URL
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sortBy = searchParams.get('sort') || 'recommended';
  
  // States for filter inputs
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || '');
  const [priceMin, setPriceMin] = useState(minPrice);
  const [priceMax, setPriceMax] = useState(maxPrice);
  const [selectedSort, setSelectedSort] = useState(sortBy);

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Apply filters and update URL
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (searchInput) params.set('search', searchInput);
    if (selectedCategory) params.set('category', selectedCategory);
    if (priceMin) params.set('minPrice', priceMin);
    if (priceMax) params.set('maxPrice', priceMax);
    if (selectedSort !== 'recommended') params.set('sort', selectedSort);
    
    setSearchParams(params);
    setIsFilterOpen(false);
    
    // Check if any filters are applied
    setFiltersApplied(!!(searchInput || selectedCategory || priceMin || priceMax || selectedSort !== 'recommended'));
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchInput('');
    setSelectedCategory('');
    setPriceMin('');
    setPriceMax('');
    setSelectedSort('recommended');
    setSearchParams({});
    setFiltersApplied(false);
  };

  // Search form submit handler
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  // Load and filter items based on URL params
  useEffect(() => {
    // Combine featured and recent items
    let allItems = [...featuredItems, ...recentItems];
    
    // Remove duplicates (in case some items appear in both lists)
    allItems = Array.from(new Map(allItems.map(item => [item.id, item])).values());
    
    // Apply category filter
    if (categoryParam) {
      allItems = allItems.filter(item => item.category === categoryParam);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      allItems = allItems.filter(
        item => 
          item.title.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
      );
    }
    
    // Apply price filters
    if (minPrice) {
      allItems = allItems.filter(item => item.price >= Number(minPrice));
    }
    
    if (maxPrice) {
      allItems = allItems.filter(item => item.price <= Number(maxPrice));
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        allItems.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        allItems.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // For demo, we'll just use the recentItems first
        allItems.sort((a, b) => {
          if (recentItems.find(item => item.id === a.id)) return -1;
          if (recentItems.find(item => item.id === b.id)) return 1;
          return 0;
        });
        break;
      case 'rating':
        allItems.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default recommended sorting - no change
        break;
    }
    
    setItems(allItems);
  }, [searchParams, categoryParam, searchQuery, minPrice, maxPrice, sortBy]);

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

        {/* Search Bar - Desktop */}
        <div className="mb-6 hidden md:block">
          <form onSubmit={handleSearchSubmit} className="flex space-x-4">
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

        {/* Search Bar - Mobile */}
        <div className="mb-4 md:hidden">
          <form onSubmit={handleSearchSubmit} className="flex space-x-2">
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

        {/* Filter Tags */}
        {filtersApplied && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Filters:</span>
            
            {selectedCategory && (
              <div className="flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700">
                <span>{getCategoryById(selectedCategory)?.name}</span>
                <button 
                  className="ml-1 text-primary-500 hover:text-primary-700"
                  onClick={() => {
                    setSelectedCategory('');
                    searchParams.delete('category');
                    setSearchParams(searchParams);
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {priceMin && (
              <div className="flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700">
                <span>Min: ${priceMin}</span>
                <button 
                  className="ml-1 text-primary-500 hover:text-primary-700"
                  onClick={() => {
                    setPriceMin('');
                    searchParams.delete('minPrice');
                    setSearchParams(searchParams);
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {priceMax && (
              <div className="flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700">
                <span>Max: ${priceMax}</span>
                <button 
                  className="ml-1 text-primary-500 hover:text-primary-700"
                  onClick={() => {
                    setPriceMax('');
                    searchParams.delete('maxPrice');
                    setSearchParams(searchParams);
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {selectedSort !== 'recommended' && (
              <div className="flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700">
                <span>
                  {selectedSort === 'price-low' 
                    ? 'Price: Low to High' 
                    : selectedSort === 'price-high' 
                      ? 'Price: High to Low'
                      : selectedSort === 'newest'
                        ? 'Newest'
                        : 'Highest Rated'}
                </span>
                <button 
                  className="ml-1 text-primary-500 hover:text-primary-700"
                  onClick={() => {
                    setSelectedSort('recommended');
                    searchParams.delete('sort');
                    setSearchParams(searchParams);
                  }}
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
        )}

        {/* Filters Panel */}
        {isFilterOpen && (
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
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
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
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="input"
                    min="0"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
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
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
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
              <button 
                className="btn-outline"
                onClick={() => setIsFilterOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Category List - Only show on main explore page */}
        {!categoryParam && !searchQuery && (
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Categories</h2>
            <CategoryList horizontal />
          </div>
        )}

        {/* Items Grid */}
        <ItemGrid 
          items={items} 
          title={
            items.length === 0 
              ? 'No items found' 
              : null
          }
          subtitle={
            items.length === 0 
              ? 'Try adjusting your filters or search for something else' 
              : null
          }
        />
      </div>
    </div>
  );
};

export default ExplorePage;