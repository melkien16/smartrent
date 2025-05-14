import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, DollarSign, ThumbsUp, PlusCircle, Wallet, MessageSquare, Users, BookOpen, Star, FileBox } from 'lucide-react';
import StatCard from './StatCard';

const Overview = ({ stats, user, setActiveTab, setTransactionType, setShowTransactionModal }) => {
  const navigate = useNavigate();

  const handleWithdraw = () => {
    setActiveTab('wallet');
    setTransactionType('withdraw');
    setShowTransactionModal(true);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          key="active-rentals"
          icon={Package}
          label="Active Rentals"
          value={stats.activeRentals || 0}
          color="text-green-600"
        />
        <StatCard
          key="active-listings"
          icon={FileBox}
          label="Active Listings"
          value={stats.activeListings || 0}
          color="text-blue-600"
        />
        <StatCard
          key="total-earnings"
          icon={DollarSign}
          label="Total Earnings"
          value={`$${stats.totalEarnings?.toFixed(2) || '0.00'}`}
          color="text-yellow-600"
        />
        <StatCard
          key="pending-requests"
          icon={BookOpen}
          label="Pending Requests"
          value={stats.pendingRequests || 0}
          color="text-purple-600"
        />
      </div>

      {/* Platform Status */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Financial Status</h3>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
            Active Account
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Earnings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Earnings</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Current Balance</span>
                <span className="text-sm text-green-600">${stats.totalEarnings?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>

          {/* Active Rentals */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Rentals</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Current Rentals</span>
                <span className="text-sm text-blue-600">{stats.activeRentals || 0}</span>
              </div>
            </div>
          </div>

          {/* Active Listings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Listings</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Current Listings</span>
                <span className="text-sm text-blue-600">{stats.activeListings || 0}</span>
              </div>
            </div>
          </div>

          {/* Pending Requests */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pending Requests</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Awaiting Response</span>
                <span className="text-sm text-yellow-600">{stats.pendingRequests || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/list-item"
            className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <PlusCircle className="h-6 w-6 text-primary-600 mr-2" />
            <span>Add New Listing</span>
          </Link>
          <button
            onClick={handleWithdraw}
            className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Wallet className="h-6 w-6 text-blue-600 mr-2" />
            <span>Withdraw Earnings</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <MessageSquare className="h-6 w-6 text-green-600 mr-2" />
            <span>View Messages</span>
          </button>
        </div>
      </div>

      {/* Recent Listings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Listings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.userListedItems.map((listing) => (
            <div key={listing.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <img src={listing.images[0]} alt={listing.title} className="h-16 w-16 object-cover rounded-lg" />
                <div className="ml-4">
                  <h4 className="font-medium">{listing.title}</h4>
                  <p className="text-sm text-gray-500">${listing.price}/{listing.priceUnit}</p>
                  <span className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full ${listing.isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                    {listing.isAvailable ? 'Active' : 'Rented'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview; 