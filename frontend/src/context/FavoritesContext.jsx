import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext(null);

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage when user is authenticated
    if (isAuthenticated) {
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated, user?.id]);

  const toggleFavorite = (itemId) => {
    if (!isAuthenticated) return;

    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.includes(itemId)
        ? prevFavorites.filter(id => id !== itemId)
        : [...prevFavorites, itemId];
      
      // Save to localStorage
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (itemId) => {
    return favorites.includes(itemId);
  };

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}; 