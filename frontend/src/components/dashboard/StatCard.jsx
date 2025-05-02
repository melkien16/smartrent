import React from 'react';

const StatCard = ({ icon: Icon, label, value, color, children }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center">
      <Icon className={`h-10 w-10 ${color}`} />
      <div className="ml-4 flex-1">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <div className="flex items-center">
          <p className="text-2xl font-semibold">{value}</p>
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default React.memo(StatCard); 