import React from 'react';

const Items = ({ items, loading, error, searchQuery, setSearchQuery, selectedItems, handleItemSelect, handleDeleteSelected }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Item Management</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <input 
            type="text" 
            placeholder="Search items..." 
            className="input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="space-x-2">
            <button className="btn">Flag Inappropriate</button>
            <button 
              className={`btn ${selectedItems.size > 0 ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              onClick={handleDeleteSelected}
              disabled={selectedItems.size === 0}
            >
              Delete Selected ({selectedItems.size})
            </button>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items
              .filter(item => 
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.location.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item) => (
                <div 
                  key={item._id} 
                  className={`bg-white rounded-lg shadow overflow-hidden border-2 ${
                    selectedItems.has(item._id) ? 'border-primary-500' : 'border-transparent'
                  }`}
                >
                  <div className="relative h-48">
                    <img
                      src={item.images?.[0] || 'https://via.placeholder.com/300x200'}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                        ${item.price}/{item.priceUnit}
                      </span>
                    </div>
                    <div className="absolute top-2 left-2">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item._id)}
                        onChange={() => handleItemSelect(item._id)}
                        className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-sm text-gray-600">{item.rating || '0'}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{item.location}</span>
                      <span className="mx-2">•</span>
                      <span>{item.availability}</span>
                    </div>
                    <div className="flex items-center">
                      <img
                        src={item.owner?.avatar || 'https://via.placeholder.com/40'}
                        alt={item.owner?.name || 'Owner'}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="ml-2">
                        <p className="text-sm font-medium text-gray-900">{item.owner?.name || 'Unknown Owner'}</p>
                        <p className="text-xs text-gray-500">Response: {item.owner?.responseTime || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                        Edit
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                        onClick={() => handleItemSelect(item._id)}
                      >
                        {selectedItems.has(item._id) ? 'Deselect' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Items); 