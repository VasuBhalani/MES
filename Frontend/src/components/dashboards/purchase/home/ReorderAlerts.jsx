import React from 'react';

const ReorderAlerts = () => {
  const alerts = [
    { name: 'Steel Rods', quantity: 45, level: 'Critical', color: 'bg-red-50 border-red-200' },
    { name: 'Concrete Mix', quantity: 78, level: 'Low', color: 'bg-yellow-50 border-yellow-200' },
    { name: 'Safety Gear', quantity: 120, level: 'Medium', color: 'bg-orange-50 border-orange-200' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Reorder Alerts</h3>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All →
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4">Materials below threshold</p>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div key={index} className={`p-3 rounded-lg border ${alert.color}`}>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">{alert.name}</h4>
                <p className="text-sm text-gray-600">{alert.quantity} units left</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-gray-700">{alert.level}</span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Reorder
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReorderAlerts;
