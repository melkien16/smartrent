import React, { createContext, useState, useContext } from 'react';

// Icons
import { Camera, Laptop, Drill, Car, Tent, Palette, Shirt, Bike } from 'lucide-react';

const CategoryContext = createContext(null);

export const useCategories = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categories] = useState([
    {
      id: 'electronics',
      name: 'Electronics',
      icon: <Laptop size={24} />,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'photography',
      name: 'Photography',
      icon: <Camera size={24} />,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'tools',
      name: 'Tools',
      icon: <Drill size={24} />,
      color: 'bg-yellow-100 text-yellow-700',
    },
    {
      id: 'vehicles',
      name: 'Vehicles',
      icon: <Car size={24} />,
      color: 'bg-red-100 text-red-700',
    },
    {
      id: 'camping',
      name: 'Camping',
      icon: <Tent size={24} />,
      color: 'bg-green-100 text-green-700',
    },
    {
      id: 'art',
      name: 'Art',
      icon: <Palette size={24} />,
      color: 'bg-pink-100 text-pink-700',
    },
    {
      id: 'clothing',
      name: 'Clothing',
      icon: <Shirt size={24} />,
      color: 'bg-indigo-100 text-indigo-700',
    },
    {
      id: 'sports',
      name: 'Sports',
      icon: <Bike size={24} />,
      color: 'bg-orange-100 text-orange-700',
    },
  ]);

  const getCategoryById = (id) => {
    return categories.find(cat => cat.id === id) || null;
  };

  const value = {
    categories,
    getCategoryById,
  };

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
};