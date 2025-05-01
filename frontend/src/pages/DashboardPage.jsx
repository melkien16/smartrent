import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, Package, DollarSign, AlertCircle, Clock } from 'lucide-react';
import ItemGrid from '../components/items/ItemGrid';
import { featuredItems, recentItems } from '../data/mockData';
import { dashboardMockData } from '../data/dashboardMockData';
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
              <p className="text-2xl font-semibold">{dashboardMockData.totalListings}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Package className="h-10 w-10 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Rentals</p>
              <p className="text-2xl font-semibold">{dashboardMockData.activeRentals}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Wallet className="h-10 w-10 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Wallet Balance</p>
              <p className="text-2xl font-semibold">${dashboardMockData.walletBalance}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Star className="h-10 w-10 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Account Type</p>
              <div className="flex items-center">
                <p className="text-2xl font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  {dashboardMockData.premiumStatus}
                </p>
                {dashboardMockData.premiumStatus === 'Premium' && (
                  <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                    Premium
                  </span>
                )}
              </div>
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
              
              {/* Activity Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Package className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">New Rental Request</p>
                        <p className="text-sm text-gray-500">Camera Equipment from John Doe</p>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">2 hours ago</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <DollarSign className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Payment Received</p>
                        <p className="text-sm text-gray-500">$75.00 for Drone rental</p>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">1 day ago</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <ThumbsUp className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">New Review</p>
                        <p className="text-sm text-gray-500">5 stars for your Camera listing</p>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">2 days ago</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Listing Performance</span>
                        <span className="text-sm font-medium text-gray-700">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Response Rate</span>
                        <span className="text-sm font-medium text-gray-700">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Customer Satisfaction</span>
                        <span className="text-sm font-medium text-gray-700">4.8/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <PlusCircle className="h-6 w-6 text-primary-600 mr-2" />
                    <span>Add New Listing</span>
                  </button>
                  <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
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
                  {dashboardMockData.listings.map((listing) => (
                    <div key={listing.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center">
                        <img src={listing.image} alt={listing.title} className="h-16 w-16 object-cover rounded-lg" />
                        <div className="ml-4">
                          <h4 className="font-medium">{listing.title}</h4>
                          <p className="text-sm text-gray-500">${listing.price}/day</p>
                          <span className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                            listing.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {listing.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                    {dashboardMockData.rentals.map((rental) => (
                      <tr key={rental.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img className="h-10 w-10 rounded-full" src={rental.image} alt={rental.itemName} />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{rental.itemName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{rental.owner}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            rental.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {rental.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {rental.returnDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'listings' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">My Listings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardMockData.listings.map((listing) => (
                  <div key={listing.id} className="bg-white rounded-lg shadow p-4">
                    <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <h3 className="text-lg font-semibold">{listing.title}</h3>
                    <p className="text-gray-600">${listing.price}/day</p>
                    <span className={`mt-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      listing.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {listing.status}
                    </span>
                  </div>
                ))}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-500">Total Earnings</p>
                  <p className="text-2xl font-semibold">${dashboardMockData.earnings.total}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-500">This Month</p>
                  <p className="text-2xl font-semibold">${dashboardMockData.earnings.thisMonth}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-500">Last Month</p>
                  <p className="text-2xl font-semibold">${dashboardMockData.earnings.lastMonth}</p>
                </div>
              </div>
              <div className="h-64 bg-white rounded-lg shadow p-4">
                {/* Add earnings chart */}
              </div>
            </div>
          )}

          {activeTab === 'wallet' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Wallet & Deposit</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-500">Current Balance</p>
                  <p className="text-2xl font-semibold">${dashboardMockData.wallet.balance}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-500">Pending Deposits</p>
                  <p className="text-2xl font-semibold">${dashboardMockData.wallet.pendingDeposits}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Transactions</h3>
                {dashboardMockData.wallet.recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                      <p className={`text-lg font-semibold ${
                        transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'collateral' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Collateral Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-500">Total Collateral</p>
                  <p className="text-2xl font-semibold">${dashboardMockData.collateral.total}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-500">Active Collateral</p>
                  <p className="text-2xl font-semibold">${dashboardMockData.collateral.active}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-500">Available Collateral</p>
                  <p className="text-2xl font-semibold">${dashboardMockData.collateral.available}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Collateral Items</h3>
                {dashboardMockData.collateral.items.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{item.item}</p>
                      <p className="text-lg font-semibold">${item.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'premium' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Premium Subscription</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">Current Plan: {dashboardMockData.premium.status}</h3>
                    <p className="text-gray-600">Renewal Date: {dashboardMockData.premium.renewalDate}</p>
                  </div>
                  <button className="btn-primary">Upgrade Plan</button>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Premium Features</h4>
                  <ul className="space-y-2">
                    {dashboardMockData.premium.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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