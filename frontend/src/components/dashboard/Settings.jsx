import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateUserProfile } from '../../Fetchers/userDataFetcher.js'; // Import the fetcher
import { toast } from 'react-hot-toast';
import { User, Lock, Bell, Trash2, Edit3, Save, XCircle, Loader2 } from 'lucide-react';

const Settings = () => {
    const { user, updateUser, loading: authContextLoading } = useAuth(); // Renamed loading for clarity
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isSubmittingProfile, setIsSubmittingProfile] = useState(false); // New loading state for profile update
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    // Separate loading state for password change if needed
    const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);


    const handleProfileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        if (formData.name === user?.name && formData.email === user?.email) {
            setIsEditingProfile(false);
            return;
        }
        setIsSubmittingProfile(true);
        try {
            const updatedUser = await updateUserProfile(formData);
            updateUser(updatedUser); // Update user in AuthContext
            toast.success('Profile updated successfully!');
            setIsEditingProfile(false);
        } catch (error) {
            toast.error(error.message || 'Failed to update profile.');
        } finally {
            setIsSubmittingProfile(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            toast.error('New passwords do not match.');
            return;
        }
        if (!passwordData.currentPassword || !passwordData.newPassword) {
            toast.error('Please fill in all password fields.');
            return;
        }
        setIsSubmittingPassword(true);
        try {
            // Placeholder for actual password change API call
            // Example: await changeUserPassword(passwordData);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            toast.success('Password changed successfully! (Frontend Only - API call needed)');
            setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
        } catch (error) {
            toast.error(error.message || 'Failed to change password.');
        } finally {
            setIsSubmittingPassword(false);
        }
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            // Placeholder for delete account logic
            toast.success('Account deletion initiated! (Frontend Only - API call needed)');
            // Perform actual deletion and logout/redirect
        }
    };


    if (authContextLoading && !user) { // Adjusted loading condition slightly
        return <div className="text-center py-10"><Loader2 className="animate-spin h-8 w-8 text-primary-600 mx-auto" /> Loading user settings...</div>;
    }

    if (!user) {
        // This case might be hit if authContextLoading is false but user is still null (e.g. error during auth load)
        return <div className="text-center py-10">Could not load user data. Please try refreshing.</div>;
    }

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold text-gray-900">Settings</h2>

            {/* Profile Information */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium text-gray-800 flex items-center">
                        <User size={24} className="mr-3 text-primary-600" />
                        Profile Information
                    </h3>
                    <button
                        onClick={() => {
                            setIsEditingProfile(!isEditingProfile);
                            // Reset form data to current user details if canceling edit
                            if (isEditingProfile) {
                                setFormData({ name: user.name, email: user.email });
                            }
                        }}
                        className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
                        disabled={isSubmittingProfile}
                    >
                        {isEditingProfile ? (
                            <>
                                <XCircle size={18} className="mr-1" /> Cancel
                            </>
                        ) : (
                            <>
                                <Edit3 size={18} className="mr-1" /> Edit Profile
                            </>
                        )}
                    </button>
                </div>
                {!isEditingProfile ? (
                    <div className="space-y-3">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                ) : (
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleProfileChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleProfileChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmittingProfile}
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                        >
                            {isSubmittingProfile ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <Save size={18} className="mr-2" />}
                            {isSubmittingProfile ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                )}
            </div>

            {/* Change Password */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <h3 className="text-xl font-medium text-gray-800 flex items-center mb-4">
                    <Lock size={24} className="mr-3 text-primary-600" />
                    Change Password
                </h3>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input type="password" name="currentPassword" id="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input type="password" name="newPassword" id="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input type="password" name="confirmNewPassword" id="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                    </div>
                    <button type="submit" disabled={isSubmittingPassword} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50">
                        {isSubmittingPassword ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <Save size={18} className="mr-2" />}
                        {isSubmittingPassword ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <h3 className="text-xl font-medium text-gray-800 flex items-center mb-4">
                    <Bell size={24} className="mr-3 text-primary-600" />
                    Notification Preferences
                </h3>
                <div className="space-y-3 text-gray-600">
                    <p className="italic">Notification settings are coming soon. You'll be able to control what emails and alerts you receive.</p>
                </div>
            </div>

            {/* Delete Account */}
            <div className="bg-white shadow-sm rounded-lg p-6 border border-red-200">
                <h3 className="text-xl font-medium text-red-600 flex items-center mb-4">
                    <Trash2 size={24} className="mr-3" />
                    Delete Account
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                    Permanently delete your account and all associated data. This action is irreversible.
                </p>
                <button
                    onClick={handleDeleteAccount}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Delete My Account
                </button>
            </div>
        </div>
    );
};

export default Settings; 