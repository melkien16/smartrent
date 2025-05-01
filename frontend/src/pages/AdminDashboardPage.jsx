import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../data/mockUsers';
import { mockItems } from '../data/mockItems';
import { mockRentals } from '../data/mockRentals';
import {
  Users,
  BookOpen,
  Package,
  DollarSign,
  Star,
  Shield,
  AlertTriangle,
  BarChart2,
  MessageSquare,
  Settings,
  Activity
} from 'lucide-react';

const AdminDashboardPage = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState(new Set());

  // Calculate stats from mock data
  const stats = {
    activeUsers: Object.keys(mockUsers).length - 1, // Subtract admin
    rentalsToday: mockRentals.active.length,
    weeklyIncome: mockRentals.active.reduce((sum, rental) => sum + rental.totalPrice, 0),
    pendingTasks: mockRentals.pending.length
  };

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  const tabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: Activity },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'bookings', label: 'Manage Bookings', icon: BookOpen },
    { id: 'items', label: 'Manage Items', icon: Package },
    { id: 'payments', label: 'Payments & Commissions', icon: DollarSign },
    { id: 'subscriptions', label: 'Subscriptions', icon: Star },
    { id: 'collateral', label: 'Collateral Approvals', icon: Shield },
    { id: 'reports', label: 'Reports & Disputes', icon: AlertTriangle },
    { id: 'analytics', label: 'Analytics & Insights', icon: BarChart2 },
    { id: 'messages', label: 'Messages & Support', icon: MessageSquare },
    { id: 'settings', label: 'Platform Settings', icon: Settings },
  ];

  const filteredItems = mockItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemSelect = (itemId) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(itemId)) {
      newSelectedItems.delete(itemId);
    } else {
      newSelectedItems.add(itemId);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleDeleteSelected = () => {
    // In a real application, this would make an API call to delete the items
    console.log('Deleting items:', Array.from(selectedItems));
    setSelectedItems(new Set());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center space-x-2 text-primary-600">
            <Shield className="h-6 w-6" />
            <span className="font-medium">Admin Control Panel</span>
          </div>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-10 w-10 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-semibold">{stats.activeUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <BookOpen className="h-10 w-10 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Rentals Today</p>
              <p className="text-2xl font-semibold">{stats.rentalsToday}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <DollarSign className="h-10 w-10 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Weekly Income</p>
              <p className="text-2xl font-semibold">${stats.weeklyIncome}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <AlertTriangle className="h-10 w-10 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Tasks</p>
              <p className="text-2xl font-semibold">{stats.pendingTasks}</p>
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
              
              {/* Platform Health */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">Platform Health</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm font-medium">System Status</span>
                      </div>
                      <span className="text-sm text-green-600">All Systems Operational</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm font-medium">API Response Time</span>
                      </div>
                      <span className="text-sm text-gray-600">120ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm font-medium">Database Status</span>
                      </div>
                      <span className="text-sm text-green-600">Connected</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {mockRentals.active.slice(0, 3).map((rental) => (
                      <div key={rental.id} className="flex items-center">
                        <div className="flex-shrink-0">
                          <Package className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">New Rental</p>
                          <p className="text-sm text-gray-500">
                            {rental.item.title} rented by {rental.renter.name}
                          </p>
                        </div>
                        <div className="ml-auto text-sm text-gray-500">
                          {new Date(rental.startDate).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">User Growth</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">1,234</p>
                      <p className="text-sm text-gray-500">Total Users</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 font-semibold">+12%</p>
                      <p className="text-sm text-gray-500">vs last month</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">Revenue</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">$24,500</p>
                      <p className="text-sm text-gray-500">This Month</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 font-semibold">+8%</p>
                      <p className="text-sm text-gray-500">vs last month</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">Active Listings</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">567</p>
                      <p className="text-sm text-gray-500">Total Listings</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 font-semibold">+5%</p>
                      <p className="text-sm text-gray-500">vs last month</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#TRX-1234</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$150.00</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 hours ago</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#TRX-1233</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jane Smith</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$75.00</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4 hours ago</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">User Management</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <input type="text" placeholder="Search users..." className="input" />
                    <select className="select">
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Deactivated</option>
                    </select>
                  </div>
                  <button className="btn bg-primary-600 text-white">Add Admin User</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {Object.values(mockUsers).map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={user.avatar}
                                  alt={user.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.role === 'admin' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                            <button className="text-red-600 hover:text-red-900">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Booking Management</h2>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <select className="select">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Returned</option>
                    <option>Late</option>
                  </select>
                  <button className="btn">Export</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    {/* Add bookings table */}
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'items' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Item Management</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <input 
                    type="text" 
                    placeholder="Search items..." 
                    className="input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="space-x-2">
                    <button className="btn">Flag Inappropriate</button>
                    <button 
                      className={`btn ${selectedItems.size > 0 ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                      onClick={handleDeleteSelected}
                      disabled={selectedItems.size === 0}
                    >
                      Delete Selected ({selectedItems.size})
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map((item) => (
                    <div 
                      key={item.id} 
                      className={`bg-white rounded-lg shadow overflow-hidden border-2 ${
                        selectedItems.has(item.id) ? 'border-primary-500' : 'border-transparent'
                      }`}
                    >
                      <div className="relative h-48">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className="bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                            ${item.price}/{item.priceUnit}
                          </span>
                        </div>
                        <div className="absolute top-2 left-2">
                          <input
                            type="checkbox"
                            checked={selectedItems.has(item.id)}
                            onChange={() => handleItemSelect(item.id)}
                            className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                          <div className="flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <span>{item.location}</span>
                          <span className="mx-2">•</span>
                          <span>{item.availability}</span>
                        </div>
                        <div className="flex items-center">
                          <img
                            src={item.owner.avatar}
                            alt={item.owner.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="ml-2">
                            <p className="text-sm font-medium text-gray-900">{item.owner.name}</p>
                            <p className="text-xs text-gray-500">Response: {item.owner.responseTime}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                            Edit
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                            onClick={() => handleItemSelect(item.id)}
                          >
                            {selectedItems.has(item.id) ? 'Deselect' : 'Select'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {filteredItems.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No items found matching your search criteria.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Payments & Commissions</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium">Total Revenue</h3>
                    <p className="text-2xl font-bold">$24,500</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium">Platform Commission</h3>
                    <p className="text-2xl font-bold">$2,450</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium">Pending Disputes</h3>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    {/* Add transactions table */}
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Subscription Management</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <select className="select">
                    <option>All Plans</option>
                    <option>Basic</option>
                    <option>Premium</option>
                  </select>
                  <button className="btn bg-primary-600 text-white">Add Plan</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    {/* Add subscription table */}
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'collateral' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Collateral Approvals</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <select className="select">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Add collateral review cards */}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Reports & Disputes</h2>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <select className="select">
                    <option>All Types</option>
                    <option>Item Issues</option>
                    <option>User Complaints</option>
                    <option>Payment Disputes</option>
                  </select>
                  <select className="select">
                    <option>All Status</option>
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    {/* Add reports table */}
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Analytics & Insights</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-medium mb-4">Revenue Trend</h3>
                    <div className="h-64">
                      {/* Add revenue chart */}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-medium mb-4">User Growth</h3>
                    <div className="h-64">
                      {/* Add user growth chart */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Support Messages</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <input type="text" placeholder="Search messages..." className="input" />
                  <select className="select">
                    <option>All Priority</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div className="space-y-4">
                  {/* Add message threads */}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Platform Settings</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Commission Settings</h3>
                    <div className="flex items-center space-x-2">
                      <input type="number" className="input" placeholder="Commission %" />
                      <button className="btn">Update</button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Collateral Rules</h3>
                    <textarea className="input h-24 w-full" placeholder="Enter collateral rules..."></textarea>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Terms of Service</h3>
                    <textarea className="input h-24 w-full" placeholder="Enter terms of service..."></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage; 