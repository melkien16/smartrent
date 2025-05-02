import React from 'react';
import { MapPin, Star, AlertCircle } from 'lucide-react';

const ItemDetails = ({ item }) => {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{item.title}</h1>
        <div className="flex items-center">
          <Star size={18} className="mr-1 text-yellow-400" fill="currentColor" />
          <span className="font-medium text-gray-900">{item.rating}</span>
          <span className="ml-1 text-gray-500">
            ({item.reviews} {item.reviews === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      </div>
      
      <div className="mb-4 flex items-center text-sm text-gray-500">
        <MapPin size={16} className="mr-1" />
        <span>{item.location}</span>
      </div>
      
      <div className="mb-6">
        <p className="text-gray-700">{item.description}</p>
      </div>
      
      <div className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-gray-900">Features</h2>
        <ul className="space-y-2">
          {item.features ? (
            item.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary-500"></div>
                {feature}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No specific features listed for this item</li>
          )}
        </ul>
      </div>
      
      {item.rules && (
        <div className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">Rental Rules</h2>
          <ul className="space-y-2">
            {item.rules.map((rule, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0 text-accent-500" />
                {rule}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default React.memo(ItemDetails); 