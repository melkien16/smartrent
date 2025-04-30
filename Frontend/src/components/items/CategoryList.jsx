import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../context/CategoryContext';

const CategoryList = ({ horizontal = false }) => {
  const { categories } = useCategories();

  if (horizontal) {
    return (
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-4 px-1">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/explore?category=${category.id}`}
              className="flex flex-col items-center space-y-2"
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-full ${category.color}`}>
                {category.icon}
              </div>
              <span className="text-xs font-medium text-gray-700">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/explore?category=${category.id}`}
          className="flex items-center space-x-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary-200 hover:bg-primary-50"
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${category.color}`}>
            {category.icon}
          </div>
          <span className="font-medium text-gray-700">{category.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;