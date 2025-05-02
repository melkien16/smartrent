import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Laptop, Car, Home, Gamepad2, Music2 } from 'lucide-react';

const categories = [
  { id: 1, name: 'Electronics', icon: Laptop, count: 1200 },
  { id: 2, name: 'Vehicles', icon: Car, count: 800 },
  { id: 3, name: 'Home & Garden', icon: Home, count: 1500 },
  { id: 4, name: 'Photography', icon: Camera, count: 600 },
  { id: 5, name: 'Gaming', icon: Gamepad2, count: 900 },
  { id: 6, name: 'Music', icon: Music2, count: 700 },
];

const FeaturedCategories = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-gray-900">Featured Categories</h2>
      <p className="mt-2 text-gray-600">Browse items by category</p>
      
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.id}
              to={`/explore?category=${category.name.toLowerCase()}`}
              className="group flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center transition-all hover:border-primary-500 hover:bg-primary-50"
            >
              <div className="mb-3 rounded-full bg-primary-100 p-3 text-primary-600 transition-colors group-hover:bg-primary-200">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-gray-900">{category.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{category.count} items</p>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

export default React.memo(FeaturedCategories); 