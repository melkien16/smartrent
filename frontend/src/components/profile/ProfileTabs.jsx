import React from 'react';
import ListingsTab from './ListingsTab';
import ReviewsTab from './ReviewsTab';
import RentalsTab from './RentalsTab';
import SettingsTab from './SettingsTab';

const ProfileTabs = ({ 
  activeTab, 
  setActiveTab, 
  isOwnProfile, 
  userItems, 
  userRentals, 
  userReviews,
  isAdmin,
  profileUser 
}) => {
  return (
    <>
      {!isAdmin && (
        <div className="mb-6 border-b border-gray-200">
          <div className="-mb-px flex space-x-8">
            <button
              className={`pb-4 text-sm font-medium ${
                activeTab === 'listings'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('listings')}
            >
              {isOwnProfile ? 'My Listings' : 'Listings'}
            </button>
            <button
              className={`pb-4 text-sm font-medium ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
            {isOwnProfile && (
              <>
                <button
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'rentals'
                      ? 'border-b-2 border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('rentals')}
                >
                  My Rentals
                </button>
                <button
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'settings'
                      ? 'border-b-2 border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('settings')}
                >
                  Settings
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="mt-6">
        {activeTab === 'listings' && <ListingsTab userItems={userItems} />}
        {activeTab === 'reviews' && <ReviewsTab userReviews={userReviews} />}
        {activeTab === 'rentals' && <RentalsTab userRentals={userRentals} />}
        {activeTab === 'settings' && <SettingsTab profileUser={profileUser} />}
      </div>
    </>
  );
};

export default React.memo(ProfileTabs); 