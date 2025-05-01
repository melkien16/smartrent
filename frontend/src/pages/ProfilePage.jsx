import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Mail, MapPin, Calendar, Star, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ItemGrid from '../components/items/ItemGrid';
import { mockUsers } from '../data/mockUsers';
import { mockItems } from '../data/mockItems';
import { mockRentals } from '../data/mockRentals';

const ProfilePage = () => {
  const { id } = useParams();
  const { user, isAdmin } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(isAdmin ? 'settings' : 'listings');
  const [userItems, setUserItems] = useState([]);
  
  const isOwnProfile = id === 'me' || id === user?.id;

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (isOwnProfile) {
          setProfileUser(user);
        } else {
          // Find user in mockUsers
          const foundUser = Object.values(mockUsers).find(u => u.id === id);
          
          if (foundUser) {
            setProfileUser({
              id: foundUser.id,
              name: foundUser.name,
              avatar: foundUser.avatar,
              rating: foundUser.rating,
              email: foundUser.email,
              location: foundUser.location,
              memberSince: foundUser.memberSince,
              isPremium: foundUser.isPremium,
              wallet: foundUser.wallet
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch user items
    const fetchUserItems = () => {
      if (isOwnProfile) {
        // Get items owned by the current user
        const ownedItems = mockItems.featured.filter(item => item?.owner?.id === user?.id);
        setUserItems(ownedItems);
      } else {
        // Get items owned by the profile user
        const ownedItems = mockItems.featured.filter(item => item?.owner?.id === id);
        setUserItems(ownedItems);
      }
    };

    fetchUser();
    fetchUserItems();
  }, [id, user, isOwnProfile]);

  // Get user's rentals
  const userRentals = mockRentals.active.filter(rental => rental?.renter?.id === (isOwnProfile ? user?.id : id));

  // Get user's reviews
  const userReviews = mockRentals.active
    .filter(rental => rental?.item?.owner?.id === (isOwnProfile ? user?.id : id))
    .map(rental => ({
      id: rental.id,
      rating: rental.rating,
      comment: rental.review,
      date: rental.endDate,
      renter: rental.renter
    }));

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-primary-200"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 text-red-500">
            <AlertCircle size={40} />
          </div>
          <h1 className="mb-4 text-2xl font-bold text-gray-900">User Not Found</h1>
          <p className="mb-6 text-gray-600">
            Sorry, we couldn't find the user you're looking for. They may have deleted their account.
          </p>
          <Link to="/" className="btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12 pt-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-sm">
          {/* Cover Photo */}
          <div className="h-32 bg-gradient-to-r from-primary-500 to-secondary-500 sm:h-48"></div>
          
          {/* Profile Header */}
          <div className="relative px-4 pb-5 pt-16 sm:px-6 sm:pb-6 sm:pt-24">
            {/* Avatar */}
            <div className="absolute left-4 top-0 -translate-y-1/2 sm:left-6">
              <img 
                src={profileUser.avatar} 
                alt={profileUser.name}
                className="h-24 w-24 rounded-full border-4 border-white object-cover sm:h-32 sm:w-32"
              />
            </div>
            
            <div className="flex flex-col justify-between sm:flex-row sm:items-end">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{profileUser.name}</h1>
                {profileUser.isPremium && (
                  <div className="mt-2 inline-flex items-center rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 px-3 py-1 text-sm font-medium text-white">
                    <Star size={14} className="mr-1" fill="currentColor" />
                    Premium Member
                  </div>
                )}
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                  {profileUser.location && (
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      <span>{profileUser.location}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    <span>Member since {profileUser.memberSince || 'recently'}</span>
                  </div>
                  {profileUser.rating && (
                    <div className="flex items-center">
                      <Star size={16} className="mr-1 text-yellow-400" fill="currentColor" />
                      <span>{profileUser.rating} rating</span>
                    </div>
                  )}
                </div>
              </div>
              
              {isOwnProfile && !isAdmin && (
                <Link to="/list-item" className="mt-4 self-start sm:mt-0 sm:self-auto">
                  <button className="btn-primary">
                    Add New Listing
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Verification Badges */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Verification</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center rounded-md bg-green-50 px-3 py-2 text-green-700">
              <Shield size={16} className="mr-2" />
              <span className="text-sm">Email Verified</span>
            </div>
            <div className="flex items-center rounded-md bg-green-50 px-3 py-2 text-green-700">
              <Shield size={16} className="mr-2" />
              <span className="text-sm">Phone Verified</span>
            </div>
            <div className="flex items-center rounded-md bg-gray-100 px-3 py-2 text-gray-500">
              <Shield size={16} className="mr-2" />
              <span className="text-sm">ID Not Verified</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
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

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'listings' && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                {isOwnProfile ? 'My Listings' : 'Listings'}
              </h2>
              {userItems.length > 0 ? (
                <ItemGrid items={userItems} />
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No listings found</p>
                </div>
              )}
            </div>
          )}
          {activeTab === 'reviews' && (
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
          )}
          {activeTab === 'rentals' && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">My Rentals</h2>
              {userRentals.length > 0 ? (
                <div className="space-y-4">
                  {userRentals.map(rental => (
                    <div key={rental.id} className="bg-white p-4 rounded-lg shadow">
                      <div className="flex items-center">
                        <img 
                          src={rental.item.image} 
                          alt={rental.item.title}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div className="ml-4">
                          <h3 className="font-medium">{rental.item.title}</h3>
                          <p className="text-sm text-gray-500">
                            From {rental.startDate} to {rental.endDate}
                          </p>
                          <p className="text-sm text-gray-500">
                            Total: ${rental.totalPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No active rentals</p>
                </div>
              )}
            </div>
          )}
          {activeTab === 'settings' && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Settings</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={profileUser.email}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      value={profileUser.location}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Member Since</label>
                    <input
                      type="text"
                      value={profileUser.memberSince}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;