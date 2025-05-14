import React from 'react';
import { Users, BookOpen, DollarSign, AlertTriangle, Package } from 'lucide-react';
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
          value={stats.activeUsers}
          color="text-blue-600"
        />
        <StatCard
          key="rentals-today"
          icon={BookOpen}
          label="Rentals Today"
          value={stats.rentalsToday}
          color="text-green-600"
        />
        <StatCard
          key="weekly-income"
          icon={DollarSign}
          label="Weekly Income"
          value={`$${stats.weeklyIncome}`}
          color="text-yellow-600"
        />
        <StatCard
          key="pending-tasks"
          icon={AlertTriangle}
          label="Pending Tasks"
          value={stats.pendingTasks}
          color="text-red-600"
        />
      </div>

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
            {stats.recentRentals?.slice(0, 3).map((rental) => (
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
    </div>
  );
};

export default React.memo(Overview); 