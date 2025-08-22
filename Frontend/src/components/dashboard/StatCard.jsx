import React from 'react';

const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600'
  };

  const changeColor = change?.startsWith('+') ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {change && (
        <div className="mt-4">
          <span className={`text-sm font-medium ${changeColor}`}>{change}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
