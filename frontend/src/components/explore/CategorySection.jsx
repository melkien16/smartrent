import React from 'react';
import CategoryList from '../items/CategoryList';

const CategorySection = ({ show }) => {
  if (!show) return null;

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Categories</h2>
      <CategoryList horizontal />
    </div>
  );
};

export default React.memo(CategorySection); 