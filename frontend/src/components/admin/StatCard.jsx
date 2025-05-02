import React from 'react';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center">
      <Icon className={`h-10 w-10 ${color}`} />
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

export default React.memo(StatCard); 