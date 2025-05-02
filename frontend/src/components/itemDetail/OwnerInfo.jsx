import React from 'react';
import { Link } from 'react-router-dom';
import { Star, User } from 'lucide-react';

const OwnerInfo = ({ owner }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">About the Owner</h2>
      <div className="flex items-center">
        <img 
          src={owner.avatar} 
          alt={owner.name}
          className="mr-4 h-14 w-14 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium text-gray-900">{owner.name}</h3>
          {owner.isPremium && (
            <div className="mt-1 inline-flex items-center rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 px-2 py-0.5 text-xs font-medium text-white">
              <Star size={12} className="mr-1" fill="currentColor" />
              Premium
            </div>
          )}
          <div className="mt-1 flex items-center">
            <Star size={14} className="mr-1 text-yellow-400" fill="currentColor" />
            <span className="text-sm">{owner.rating} rating</span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Typically responds {owner.responseTime}
          </p>
          <Link 
            to={`/profile/${owner._id}`}
            className="mt-2 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <User size={14} className="mr-1" />
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(OwnerInfo); 