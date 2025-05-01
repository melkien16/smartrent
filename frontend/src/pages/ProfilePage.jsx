import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Mail, MapPin, Calendar, Star, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ItemGrid from '../components/items/ItemGrid';
import { featuredItems, recentItems } from '../data/mockData';

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
    // In a real app, this would be an API call
    // For demo purposes, we'll use the current user or a mock user
    
    const fetchUser = async () => {
      try {
        if (isOwnProfile) {
          setProfileUser(user);
        } else {
          // Get owner info from an item with matching owner id
          const allItems = [...featuredItems, ...recentItems];
          const ownerItem = allItems.find(item => item.owner?.id === id);
          
          if (ownerItem) {
            setProfileUser({
              id: ownerItem.owner.id,
              name: ownerItem.owner.name,
              avatar: ownerItem.owner.avatar,
              rating: ownerItem.owner.rating,
              email: 'owner@example.com', // Mock data
              location: 'San Francisco, CA', // Mock data
              memberSince: 'January 2023', // Mock data
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
      // In a real app, this would be an API call
      // For demo, we'll pick random items
      const allItems = [...featuredItems, ...recentItems];
      
      // If looking at own profile, show 3 random items
      // Otherwise, show items from this owner
      if (isOwnProfile) {
        const randomItems = allItems.sort(() => 0.5 - Math.random()).slice(0, 3);
        setUserItems(randomItems);
      } else {
        const ownerItems = allItems.filter(item => item.owner?.id === id);
        setUserItems(ownerItems);
      }
    };

    fetchUser();
    fetchUserItems();
  }, [id, user, isOwnProfile]);

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
        <div className="animate-fade-in">
          {!isAdmin && activeTab === 'listings' && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                {isOwnProfile ? 'My Listings' : `${profileUser.name}'s Listings`}
              </h2>
              
              {userItems.length > 0 ? (
                <ItemGrid items={userItems} />
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
                  <p className="mb-2 text-lg font-medium text-gray-900">No listings yet</p>
                  {isOwnProfile ? (
                    <>
                      <p className="mb-4 text-gray-500">Start earning money by listing your items for rent</p>
                      <Link to="/list-item" className="btn-primary">
                        List an Item
                      </Link>
                    </>
                  ) : (
                    <p className="text-gray-500">This user hasn't listed any items yet</p>
                  )}
                </div>
              )}
            </div>
          )}

          {!isAdmin && activeTab === 'reviews' && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Reviews</h2>
              
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
                <p className="mb-2 text-lg font-medium text-gray-900">No reviews yet</p>
                <p className="text-gray-500">
                  {isOwnProfile 
                    ? 'You haven\'t received any reviews yet' 
                    : 'This user hasn\'t received any reviews yet'}
                </p>
              </div>
            </div>
          )}

          {!isAdmin && activeTab === 'rentals' && isOwnProfile && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">My Rentals</h2>
              
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
                <p className="mb-2 text-lg font-medium text-gray-900">No rentals yet</p>
                <p className="mb-4 text-gray-500">You haven't rented any items yet</p>
                <Link to="/explore" className="btn-primary">
                  Explore Items to Rent
                </Link>
              </div>
            </div>
          )}

          {(isAdmin || activeTab === 'settings') && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Profile Settings</h2>
              
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="input"
                    defaultValue={profileUser.name}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="input"
                    defaultValue={profileUser.email}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    className="input"
                    defaultValue={profileUser.location}
                    placeholder="e.g., Seattle, WA"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    About Me
                  </label>
                  <textarea
                    className="input min-h-[120px]"
                    placeholder="Tell others about yourself..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;