import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../context/CategoryContext';

const Breadcrumbs = ({ item }) => {
  const { getCategoryById } = useCategories();
  const category = getCategoryById(item.category);

  return (
    <div className="mb-4">
      <nav className="flex items-center text-sm">
        <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/explore" className="text-gray-500 hover:text-primary-600">Explore</Link>
        {category && (
          <>
            <span className="mx-2 text-gray-400">/</span>
            <Link 
              to={`/explore?category=${category.id}`} 
              className="text-gray-500 hover:text-primary-600"
            >
              {category.name}
            </Link>
          </>
        )}
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-700 line-clamp-1">{item.title}</span>
      </nav>
    </div>
  );
};

export default React.memo(Breadcrumbs); 