import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, MapPin } from 'lucide-react';
import { useCategories } from '../../context/CategoryContext';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';

const ItemCard = ({ item }) => {
  const { getCategoryById } = useCategories();
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const category = getCategoryById(item.category);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    toggleFavorite(item._id);
  };

  return (
    <div className="group animate-fade-in">
      <Link to={`/item/${item._id}`} className="block overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200">
          <img
            src={item.images[0]}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button
            onClick={handleFavoriteClick}
            className={`absolute right-3 top-3 rounded-full bg-white p-1.5 shadow-sm transition-colors ${isFavorite(item._id) ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            <Heart size={18} fill={isFavorite(item._id) ? 'currentColor' : 'none'} />
          </button>
          {category && (
            <div className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${category.color}`}>
              {category.name}
            </div>
          )}
        </div>
        
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium text-gray-900 group-hover:text-primary-500">
              {item.title}
            </h3>
            <div className="flex items-center text-sm">
              <Star size={16} className="mr-1 text-yellow-400" fill="currentColor" />
              <span>{item.rating}</span>
            </div>
          </div>
          
          <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.description}</p>
          
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <MapPin size={14} className="mr-1" />
            <span>{item.location}</span>
          </div>
          
          <div className="mt-2 flex items-baseline justify-between">
            <div>
              <span className="text-lg font-semibold text-gray-900">${item.price}</span>
              <span className="text-sm text-gray-500">/{item.priceUnit}</span>
            </div>
            <span className="text-xs text-gray-500">Available {item.availability}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;