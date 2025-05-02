import React from 'react';
import { Star } from 'lucide-react';

const ReviewsTab = ({ userReviews }) => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Reviews</h2>
      {userReviews.length > 0 ? (
        <div className="space-y-4">
          {userReviews.map(review => (
            <div key={review.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={review.renter.avatar} 
                    alt={review.renter.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="ml-3">
                    <p className="font-medium">{review.renter.name}</p>
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
                      <span className="text-sm text-gray-500">{review.rating}/5</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              {review.comment && (
                <p className="mt-2 text-gray-600">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No reviews yet</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(ReviewsTab); 