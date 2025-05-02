import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, Package, DollarSign, AlertCircle, Clock, PlusCircle, MinusCircle, X } from 'lucide-react';
import ItemGrid from '../components/items/ItemGrid';
import { mockItems } from '../data/mockItems';
import { mockRentals } from '../data/mockRentals';
import {
  LayoutDashboard,
  Wallet,
  Shield,
  Star,
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  FileBox
} from 'lucide-react';

const DashboardPage = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionType, setTransactionType] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  // Get user's items and rentals
  const userListedItems = mockItems.featured.filter(item => item?.owner?.id === user?.id);
  const userRentedItems = mockRentals.active.filter(rental => rental?.renter?.id === user?.id);

  const stats = {
    activeRentals: userRentedItems.length,
    activeListings: userListedItems.length,
    totalEarnings: userListedItems.reduce((sum, item) => sum + (item?.price || 0), 0),
    pendingRequests: mockRentals.pending.filter(rental => rental?.item?.owner?.id === user?.id).length,
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

  const handleTransaction = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (transactionType === 'withdraw' && numericAmount > (user?.wallet?.balance || 0)) {
      setError('Insufficient balance');
      return;
    }

    // In a real app, this would be an API call
    // For demo purposes, we'll update the mock data
    const newTransaction = {
      id: Date.now().toString(),
      type: transactionType,
      amount: numericAmount,
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    };

    // Update wallet balance
    const updatedBalance = transactionType === 'deposit' 
      ? (user?.wallet?.balance || 0) + numericAmount
      : (user?.wallet?.balance || 0) - numericAmount;

    // Update user's wallet data
    user.wallet = {
      ...user.wallet,
      balance: updatedBalance,
      recentTransactions: [
        newTransaction,
        ...(user?.wallet?.recentTransactions || [])
      ]
    };

    // Reset form and close modal
    setAmount('');
    setError('');
    setShowTransactionModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Transaction Modal */}
      {showTransactionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {transactionType === 'deposit' ? 'Deposit Funds' : 'Withdraw Funds'}
              </h3>
              <button 
                onClick={() => {
                  setShowTransactionModal(false);
                  setError('');
                  setAmount('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  min="0"
                  step="0.01"
                />
              </div>
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowTransactionModal(false);
                  setError('');
                  setAmount('');
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleTransaction}
                className="btn-primary"
              >
                {transactionType === 'deposit' ? 'Deposit' : 'Withdraw'}
              </button>
            </div>
          </div>
        </div>
      )}

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
              <p className="text-2xl font-semibold">{stats.activeListings}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Package className="h-10 w-10 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Rentals</p>
              <p className="text-2xl font-semibold">{stats.activeRentals}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Wallet className="h-10 w-10 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Wallet Balance</p>
              <p className="text-2xl font-semibold">${user?.wallet?.balance}</p>
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
                  {user?.isPremium ? 'Premium' : 'Basic'}
                </p>
                {user?.isPremium && (
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
                  {userListedItems.map((listing) => (
                    <div key={listing.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center">
                        <img src={listing.images[0]} alt={listing.title} className="h-16 w-16 object-cover rounded-lg" />
                        <div className="ml-4">
                          <h4 className="font-medium">{listing.title}</h4>
                          <p className="text-sm text-gray-500">${listing.price}/{listing.priceUnit}</p>
                          <span className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                            listing.isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
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
          )}

          {activeTab === 'rentals' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">My Rentals</h2>
              {userRentedItems.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">You don't have any active rentals yet.</p>
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className="mt-4 text-primary-600 hover:text-primary-700"
                  >
                    Browse available items
                  </button>
                </div>
              ) : (
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
                      {userRentedItems.map((rental) => (
                        <tr key={rental?.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img 
                                className="h-10 w-10 rounded-full" 
                                src={rental?.item?.images?.[0] || '/placeholder.png'} 
                                alt={rental?.item?.title || 'Item'} 
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{rental?.item?.title || 'Unknown Item'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{rental?.item?.owner?.name || 'Unknown Owner'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              rental?.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {rental?.status || 'Unknown'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {rental?.returnDate || 'Not specified'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'listings' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">My Listings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userListedItems.map((listing) => (
                  <div key={listing.id} className="bg-white rounded-lg shadow p-4">
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <h3 className="text-lg font-semibold">{listing.title}</h3>
                    <p className="text-gray-600">${listing.price}/{listing.priceUnit}</p>
                    <span className={`mt-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      listing.isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {listing.isAvailable ? 'Active' : 'Rented'}
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
                  <p className="text-2xl font-semibold">${stats.totalEarnings || 0}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-500">This Month</p>
                  <p className="text-2xl font-semibold">${user?.earnings?.thisMonth || 0}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-500">Last Month</p>
                  <p className="text-2xl font-semibold">${user?.earnings?.lastMonth || 0}</p>
                </div>
              </div>
              <div className="h-64 bg-white rounded-lg shadow p-4">
                {user?.earnings?.chartData ? (
                  // Add earnings chart here when data is available
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Earnings chart will be displayed here</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <DollarSign className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">No earnings data available yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'wallet' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Wallet & Deposit</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-500">Current Balance</p>
                  <p className="text-2xl font-semibold">${user?.wallet?.balance || 0}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-500">Pending Deposits</p>
                  <p className="text-2xl font-semibold">${user?.wallet?.pendingDeposits || 0}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <button 
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                  onClick={() => {
                    setTransactionType('deposit');
                    setShowTransactionModal(true);
                  }}
                >
                  <PlusCircle className="h-5 w-5" />
                  Deposit
                </button>
                <button 
                  className="flex-1 btn-secondary flex items-center justify-center gap-2"
                  onClick={() => {
                    setTransactionType('withdraw');
                    setShowTransactionModal(true);
                  }}
                >
                  <MinusCircle className="h-5 w-5" />
                  Withdraw
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Transactions</h3>
                {user?.wallet?.recentTransactions?.length > 0 ? (
                  user.wallet.recentTransactions.map((transaction) => (
                    <div key={transaction?.id} className="bg-white p-4 rounded-lg shadow">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{transaction?.type === 'deposit' ? 'Deposit' : 'Withdrawal'}</p>
                          <p className="text-sm text-gray-500">{transaction?.date || 'Unknown date'}</p>
                        </div>
                        <p className={`text-lg font-semibold ${
                          transaction?.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction?.type === 'deposit' ? '+' : '-'}${transaction?.amount || 0}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No recent transactions</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'collateral' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Collateral Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-500">Total Collateral</p>
                  <p className="text-2xl font-semibold">${user?.collateral?.total || 0}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-500">Active Collateral</p>
                  <p className="text-2xl font-semibold">${user?.collateral?.active || 0}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-500">Available Collateral</p>
                  <p className="text-2xl font-semibold">${user?.collateral?.available || 0}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Collateral Items</h3>
                {user?.collateral?.items?.length > 0 ? (
                  user.collateral.items.map((item) => (
                    <div key={item?.id} className="bg-white p-4 rounded-lg shadow">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">{item?.name || 'Unknown Item'}</p>
                        <p className="text-lg font-semibold">${item?.amount || 0}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No collateral items found</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'premium' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Premium Subscription</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Current Plan: {user?.isPremium ? 'Premium' : 'Basic'}
                    </h3>
                    <p className="text-gray-600">
                      Renewal Date: {user?.premium?.renewalDate || 'Not specified'}
                    </p>
                  </div>
                  <button className="btn-primary">
                    {user?.isPremium ? 'Manage Subscription' : 'Upgrade Plan'}
                  </button>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Premium Features</h4>
                  {user?.premium?.features?.length > 0 ? (
                    <ul className="space-y-2">
                      {user.premium.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-500 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-4">
                      <Star className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">No premium features available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Messages</h2>
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No messages yet</p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <div className="text-center py-8">
                <ThumbsUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No reviews yet</p>
              </div>
            </div>
          )}

          {activeTab === 'report' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Report a Problem</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Enter the subject of your report"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      rows={4}
                      placeholder="Describe the problem in detail"
                    />
                  </div>
                  <button type="submit" className="btn-primary">
                    Submit Report
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 