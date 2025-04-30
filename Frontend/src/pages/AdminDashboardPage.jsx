import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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

  // Mock data - in a real app, this would come from your backend API
  const stats = {
    activeUsers: 150,
    rentalsToday: 25,
    weeklyIncome: 3500,
    pendingTasks: 8
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
              <p className="text-gray-600">Platform performance at a glance</p>
              {/* Add KPI charts and recent activity */}
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
                      {/* Add user rows */}
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
                  <input type="text" placeholder="Search items..." className="input" />
                  <div className="space-x-2">
                    <button className="btn">Flag Inappropriate</button>
                    <button className="btn bg-red-600 text-white">Delete Selected</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Add item cards */}
                </div>
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