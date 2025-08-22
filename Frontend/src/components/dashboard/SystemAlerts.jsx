import React from 'react';
import { ExclamationTriangleIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const SystemAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'error',
      title: 'Critical Equipment Failure',
      description: 'Line 3 - Packaging Unit',
      time: '7 min ago',
      icon: ExclamationTriangleIcon,
      color: 'text-red-600 bg-red-50'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Batch Delay Warning',
      description: 'Batch #1245 - 50min delay',
      time: '15 min ago',
      icon: ExclamationTriangleIcon,
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update Available',
      description: 'Version 2.1.3 ready',
      time: '1 hour ago',
      icon: InformationCircleIcon,
      color: 'text-blue-600 bg-blue-50'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">System Alerts</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            5 Active
          </span>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div key={alert.id} className="px-6 py-4 flex items-start space-x-4">
              <div className={`p-2 rounded-lg ${alert.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                <p className="text-sm text-gray-500">{alert.description}</p>
                <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SystemAlerts;
