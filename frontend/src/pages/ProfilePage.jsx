import React from 'react';
import LoadingState from '../components/profile/LoadingState';
import NotFoundState from '../components/profile/NotFoundState';
import ProfileHeader from '../components/profile/ProfileHeader';
import VerificationBadges from '../components/profile/VerificationBadges';
import ProfileTabs from '../components/profile/ProfileTabs';
import { useProfile } from '../hooks/useProfile';

const ProfilePage = () => {
  const { 
    profileUser, 
    loading, 
    userItems, 
    userRentals, 
    userReviews, 
    activeTab, 
    setActiveTab, 
    isOwnProfile,
    isAdmin 
  } = useProfile();

  if (loading) return <LoadingState />;
  if (!profileUser) return <NotFoundState />;

  return (
    <div className="min-h-screen bg-gray-50 pb-12 pt-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileHeader 
          profileUser={profileUser} 
          isOwnProfile={isOwnProfile} 
        />
        <VerificationBadges profileUser={profileUser} />
        <ProfileTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOwnProfile={isOwnProfile}
          isAdmin={isAdmin}
          userItems={userItems}
          userRentals={userRentals}
          userReviews={userReviews}
        />
      </div>
    </div>
  );
};

export default ProfilePage;