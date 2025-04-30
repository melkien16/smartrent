import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, Package, DollarSign, AlertCircle, Clock } from 'lucide-react';
import ItemGrid from '../components/items/ItemGrid';
import { featuredItems, recentItems } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  Wallet,
  Shield,
  Star,
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  FileBox
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in a real app, this would come from an API
  const userRentedItems = featuredItems.filter(item => item.renterId === user?.id);
  const userListedItems = recentItems.filter(item => item.owner?.id === user?.id);

  const stats = {
    activeRentals: userRentedItems.length,
    activeListings: userListedItems.length,
    totalEarnings: userListedItems.reduce((sum, item) => sum + (item.price || 0), 0),
    pendingRequests: 3, // Mock data
  };

  const mockData = {
    totalListings: 5,
    activeRentals: 3,
    walletBalance: 250.00,
    pendingBookings: 2,
    premiumStatus: 'Basic'
  };

  const tabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'rentals', label: 'My Rentals', icon: Package },
    { id: 'listings', label: 'My Listings', icon: FileBox },
    { id: 'new-item', label: 'Add New Item', icon: PlusCircle },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'wallet', label: 'Wallet & Deposit', icon: Wallet },
    { id: 'collateral', label: 'Collateral', icon: Shield },
    { id: 'premium', label: 'Premium', icon: Star },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'reviews', label: 'Reviews', icon: ThumbsUp },
    { id: 'report', label: 'Report a Problem', icon: AlertTriangle },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, {user?.name}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FileBox className="h-10 w-10 text-primary-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Listings</p>
              <p className="text-2xl font-semibold">{mockData.totalListings}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Package className="h-10 w-10 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Rentals</p>
              <p className="text-2xl font-semibold">{mockData.activeRentals}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Wallet className="h-10 w-10 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Wallet Balance</p>
              <p className="text-2xl font-semibold">${mockData.walletBalance}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Star className="h-10 w-10 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Account Type</p>
              <p className="text-2xl font-semibold">{mockData.premiumStatus}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
              <p className="text-gray-600">View your summarized stats and activity</p>
              {/* Add overview content */}
            </div>
          )}

          {activeTab === 'rentals' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">My Rentals</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {/* Add rental items */}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'listings' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">My Listings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Add listing cards */}
              </div>
            </div>
          )}

          {activeTab === 'new-item' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
              <form className="space-y-6">
                {/* Add item form */}
              </form>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Earnings Overview</h2>
              <div className="h-64">
                {/* Add earnings chart */}
              </div>
            </div>
          )}

          {activeTab === 'wallet' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Wallet & Deposit</h2>
              <div className="space-y-6">
                {/* Add wallet and deposit UI */}
              </div>
            </div>
          )}

          {activeTab === 'collateral' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Collateral Management</h2>
              <div className="space-y-6">
                {/* Add collateral UI */}
              </div>
            </div>
          )}

          {activeTab === 'premium' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Premium Subscription</h2>
              <div className="space-y-6">
                {/* Add premium subscription UI */}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Messages</h2>
              <div className="space-y-4">
                {/* Add messages UI */}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <div className="space-y-4">
                {/* Add reviews UI */}
              </div>
            </div>
          )}

          {activeTab === 'report' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Report a Problem</h2>
              <form className="space-y-6">
                {/* Add report form */}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 