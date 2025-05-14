import React from 'react';
import { Users, BookOpen, Star, Package } from 'lucide-react';
import StatCard from './StatCard';

const Overview = ({ stats }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          key="active-users"
          icon={Users}
          label="Active Users"
          value={stats.activeUsers || 0}
          color="text-blue-600"
        />
        <StatCard
          key="active-rentals"
          icon={BookOpen}
          label="Active Rentals"
          value={stats.activeRentals || 0}
          color="text-green-600"
        />
        <StatCard
          key="premium-users"
          icon={Star}
          label="Premium Users"
          value={stats.premiumUsers || 0}
          color="text-yellow-600"
        />
        <StatCard
          key="total-items"
          icon={Package}
          label="Total Items"
          value={stats.totalItems || 0}
          color="text-purple-600"
        />
      </div>

      {/* Platform Health */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Platform Health</h3>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
            All Systems Operational
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* System Performance */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">System Performance</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">API Response</span>
                <span className="text-sm text-green-600">120ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Server Load</span>
                <span className="text-sm text-green-600">32%</span>
              </div>
            </div>
          </div>

          {/* Database Status */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Database</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Status</span>
                <span className="text-sm text-green-600">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Storage</span>
                <span className="text-sm text-green-600">45% Used</span>
              </div>
            </div>
          </div>

          {/* User Activity */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">User Activity</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Active Sessions</span>
                <span className="text-sm text-blue-600">{stats.activeSessions || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Online Users</span>
                <span className="text-sm text-blue-600">{stats.onlineUsers || 0}</span>
              </div>
            </div>
          </div>

          {/* System Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Resources</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">CPU Usage</span>
                <span className="text-sm text-green-600">28%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Memory</span>
                <span className="text-sm text-green-600">42% Used</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Status Timeline */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">System Status Timeline</h4>
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-gray-600">All systems operational</span>
              <span className="ml-auto text-gray-500">Just now</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-gray-600">Database backup in progress</span>
              <span className="ml-auto text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-gray-600">System maintenance completed</span>
              <span className="ml-auto text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Overview); 