import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const FeaturedItems = ({ items }) => (
  <section className="py-16 px-4 sm:px-6 lg:px-8">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-gray-900">Featured Items</h2>
      <p className="mt-2 text-gray-600">Discover popular items available for rent</p>
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items?.map((item) => (
          <Link
            key={item.id}
            to={`/item/${item.id}`}
            className="group overflow-hidden rounded-lg border border-gray-200 transition-all hover:border-primary-500 hover:shadow-lg"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{item.title}</h3>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-lg font-semibold text-primary-600">
                  ${item.pricePerDay}/day
                </span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">{item.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default React.memo(FeaturedItems); 