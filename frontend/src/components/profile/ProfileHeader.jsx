import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Star, Camera } from 'lucide-react';
import { useRef } from 'react';
import { updateUserProfile } from '../../Fetchers/userDataFetcher';
import { toast } from 'react-hot-toast';

const ProfileHeader = ({ profileUser, isOwnProfile, onProfileUpdate }) => {
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    if (isOwnProfile) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('avatar', file);
        
        const updatedUser = await updateUserProfile(formData);
        toast.success('Profile picture updated successfully!');
        
        // If onProfileUpdate prop is provided, call it with the updated user data
        if (onProfileUpdate) {
          onProfileUpdate(updatedUser);
        }
      } catch (error) {
        console.error("Failed to update avatar:", error);
        toast.error(error.message || 'Failed to update profile picture');
      }
    }
  };

  return (
    <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-sm">
      {/* Cover Photo */}
      <div className="h-32 bg-gradient-to-r from-primary-500 to-secondary-500 sm:h-48"></div>

      {/* Profile Header */}
      <div className="relative px-4 pb-5 pt-16 sm:px-6 sm:pb-6 sm:pt-24">
        {/* Avatar */}
        <div className="absolute left-4 top-0 -translate-y-1/2 sm:left-6">
          <div className="relative">
            <img
              src={profileUser.avatar}
              alt={profileUser.name}
              className="h-24 w-24 rounded-full border-4 border-white object-cover sm:h-32 sm:w-32"
            />
            {isOwnProfile && (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <button
                  onClick={handleAvatarClick}
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-white opacity-75 hover:opacity-100 sm:h-10 sm:w-10"
                  aria-label="Change profile picture"
                >
                  <Camera size={16} smSize={20} />
                </button>
              </>
            )}
          </div>
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

          {isOwnProfile && (
            <Link to="/list-item" className="mt-4 self-start sm:mt-0 sm:self-auto">
              <button className="btn-primary">
                Add New Listing
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfileHeader); 