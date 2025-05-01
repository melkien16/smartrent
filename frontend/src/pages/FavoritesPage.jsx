import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import ItemGrid from '../components/items/ItemGrid';
import { mockItems } from '../data/mockItems';

const FavoritesPage = () => {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll use mockItems
    const allItems = [...mockItems.featured, ...mockItems.recent];
    const favorites = allItems.filter(item => 
      user?.favorites?.includes(item.id)
    );
    setFavoriteItems(favorites);
    setLoading(false);
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Heart size={48} className="mx-auto text-gray-400" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Sign in to view your favorites</h2>
          <p className="mt-2 text-gray-600">Please sign in to view and manage your favorite items.</p>
          <Link
            to="/auth"
            className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            <span className="font-medium">Sign in</span>
            <ArrowLeft size={16} className="ml-1 rotate-180" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Favorites</h1>
        <p className="mt-2 text-lg text-gray-600">
          {favoriteItems.length === 0
            ? "You haven't added any items to your favorites yet."
            : `You have ${favoriteItems.length} favorite item${favoriteItems.length === 1 ? '' : 's'}.`}
        </p>
      </div>

      {favoriteItems.length > 0 ? (
        <ItemGrid items={favoriteItems} />
      ) : (
        <div className="text-center">
          <Heart size={48} className="mx-auto text-gray-400" />
          <p className="mt-4 text-gray-600">
            Start exploring items and add them to your favorites by clicking the heart icon.
          </p>
          <Link
            to="/explore"
            className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            <span className="font-medium">Explore Items</span>
            <ArrowLeft size={16} className="ml-1 rotate-180" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage; 