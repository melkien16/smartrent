import React from 'react';

const Analytics = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Analytics & Insights</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-4">Revenue Trend</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Revenue chart will be displayed here</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-4">User Growth</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">User growth chart will be displayed here</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-2">Top Categories</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Electronics</span>
                <span className="font-medium">35%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tools</span>
                <span className="font-medium">25%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sports</span>
                <span className="font-medium">20%</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-2">User Activity</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Active Users</span>
                <span className="font-medium">1,234</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">New Signups</span>
                <span className="font-medium">45</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Returning Users</span>
                <span className="font-medium">789</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-2">Platform Performance</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg. Response Time</span>
                <span className="font-medium">120ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Uptime</span>
                <span className="font-medium">99.9%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Error Rate</span>
                <span className="font-medium">0.1%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Analytics); 